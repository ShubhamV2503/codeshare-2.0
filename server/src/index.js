const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const os = require('os');

const app = express();
app.use(cors());
app.use(express.json()); // Essential for parsing POST bodies

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins for local dev
    methods: ['GET', 'POST']
  }
});

const roomState = {};
const roomUsers = {}; // Object to track users per room
const roomTimers = {}; // { roomId: { duration: number, remaining: number, isRunning: boolean } }
const roomIntervals = {}; // Store setInterval IDs per room
const roomDrawings = {}; // Store canvas drawing strokes per room

// Helper to generate a random cursor color
const generateRandomColor = () => {
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
    '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB',
    '#E67E22', '#2ECC71', '#F1C40F', '#E74C3C'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`User ${socket.id} joined room: ${roomId}`);

    // Initialize room users array if it doesn't exist
    if (!roomUsers[roomId]) {
      roomUsers[roomId] = [];
    }

    // Add user to the room's user list with a random color and default name
    const newUser = {
      socketId: socket.id,
      name: `User-${socket.id.substring(0, 4)}`,
      color: generateRandomColor()
    };
    roomUsers[roomId].push(newUser);

    // Send existing code if present
    if (roomState[roomId]) {
      socket.emit('code-update', roomState[roomId]);
    }

    // Broadcast updated user list to everyone in the room
    io.to(roomId).emit('users-update', roomUsers[roomId]);

    // Send existing timer state if present
    if (roomTimers[roomId]) {
      socket.emit('timer-sync', roomTimers[roomId]);
    }

    // Send existing drawings if present
    if (roomDrawings[roomId] && roomDrawings[roomId].length > 0) {
      socket.emit('drawing-sync', roomDrawings[roomId]);
    }
  });

  socket.on('code-change', ({ roomId, code }) => {
    roomState[roomId] = code; // Save latest state
    // Broadcast the code change to everyone else in the room
    socket.to(roomId).emit('code-update', code);
  });

  // Handle cursor movement broadcasting
  socket.on('cursor-change', ({ roomId, cursor }) => {
    // cursor object should contain { position: {lineNumber, column} }
    socket.to(roomId).emit('cursor-update', {
      socketId: socket.id,
      cursor
    });
  });

  // --- Drawing Features ---

  socket.on('draw-line', ({ roomId, line }) => {
    if (!roomDrawings[roomId]) {
      roomDrawings[roomId] = [];
    }
    roomDrawings[roomId].push(line);
    socket.to(roomId).emit('draw-line', line);
  });

  socket.on('clear-canvas', (roomId) => {
    roomDrawings[roomId] = [];
    io.to(roomId).emit('clear-canvas');
  });

  // --- Timer Features ---

  socket.on('set-timer', ({ roomId, duration }) => {
    roomTimers[roomId] = {
      duration,       // Total original duration in seconds
      remaining: duration,
      isRunning: false
    };
    // If a timer is already running, stop the interval
    if (roomIntervals[roomId]) {
      clearInterval(roomIntervals[roomId]);
      delete roomIntervals[roomId];
    }
    io.to(roomId).emit('timer-sync', roomTimers[roomId]);
  });

  socket.on('start-timer', (roomId) => {
    // Initialize default timer if it doesn't exist
    if (!roomTimers[roomId]) {
      roomTimers[roomId] = { duration: 300, remaining: 300, isRunning: false };
    }

    if (roomTimers[roomId].isRunning || roomTimers[roomId].remaining <= 0) return;

    roomTimers[roomId].isRunning = true;
    io.to(roomId).emit('timer-sync', roomTimers[roomId]);

    roomIntervals[roomId] = setInterval(() => {
      roomTimers[roomId].remaining -= 1;

      if (roomTimers[roomId].remaining <= 0) {
        // Timer strictly finished
        roomTimers[roomId].remaining = 0;
        roomTimers[roomId].isRunning = false;
        clearInterval(roomIntervals[roomId]);
        delete roomIntervals[roomId];
        io.to(roomId).emit('timer-end', roomTimers[roomId]);
      } else {
        io.to(roomId).emit('timer-tick', roomTimers[roomId]);
      }
    }, 1000);
  });

  socket.on('pause-timer', (roomId) => {
    if (!roomTimers[roomId] || !roomTimers[roomId].isRunning) return;

    roomTimers[roomId].isRunning = false;
    if (roomIntervals[roomId]) {
      clearInterval(roomIntervals[roomId]);
      delete roomIntervals[roomId];
    }
    io.to(roomId).emit('timer-sync', roomTimers[roomId]);
  });

  socket.on('reset-timer', (roomId) => {
    if (!roomTimers[roomId]) {
      roomTimers[roomId] = { duration: 300, remaining: 300, isRunning: false };
    }

    roomTimers[roomId].isRunning = false;
    roomTimers[roomId].remaining = roomTimers[roomId].duration;

    if (roomIntervals[roomId]) {
      clearInterval(roomIntervals[roomId]);
      delete roomIntervals[roomId];
    }
    io.to(roomId).emit('timer-sync', roomTimers[roomId]);
  });

  // -----------------------

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);

    // Remove user from any rooms they were in
    for (const roomId in roomUsers) {
      const userIndex = roomUsers[roomId].findIndex(u => u.socketId === socket.id);
      if (userIndex !== -1) {
        roomUsers[roomId].splice(userIndex, 1);

        // Broadcast the updated user list to the room
        io.to(roomId).emit('users-update', roomUsers[roomId]);

        // Notify others to remove this user's cursor
        socket.to(roomId).emit('user-disconnected', socket.id);

        // Clean up empty rooms
        if (roomUsers[roomId].length === 0) {
          delete roomUsers[roomId];
          delete roomState[roomId];

          if (roomIntervals[roomId]) {
            clearInterval(roomIntervals[roomId]);
            delete roomIntervals[roomId];
          }
          delete roomTimers[roomId];
          delete roomDrawings[roomId];
        }
      }
    }
  });
});

// --- Code Execution API (Compilex) ---
const compiler = require('compilex');
compiler.init({ stats: true });

app.post('/api/execute', (req, res) => {
  const { language, code } = req.body;

  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }

  // Compilex generic OS detection
  const envData = { OS: process.platform === "win32" ? "windows" : "linux" };

  try {
    if (language === 'python') {
      compiler.compilePython(envData, code, (data) => {
        if (data.error) res.json({ error: data.error });
        else res.json({ output: data.output });
      });
    } else if (language === 'java') {
      compiler.compileJava(envData, code, (data) => {
        if (data.error) res.json({ error: data.error });
        else res.json({ output: data.output });
      });
    } else if (language === 'cpp' || language === 'c') {
      envData.cmd = language === 'cpp' ? "g++" : "gcc";
      compiler.compileCPP(envData, code, (data) => {
        if (data.error) res.json({ error: data.error });
        else res.json({ output: data.output });
      });
    } else if (language === 'javascript') {
      const tempPath = path.join(os.tmpdir(), `temp_${Date.now()}.js`);
      fs.writeFileSync(tempPath, code);
      exec(`node ${tempPath}`, (error, stdout, stderr) => {
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        if (error) res.json({ error: stderr || error.message });
        else res.json({ output: stdout });
      });
    } else if (language === 'go') {
      const tempPath = path.join(os.tmpdir(), `main_${Date.now()}.go`);
      fs.writeFileSync(tempPath, code);
      exec(`go run ${tempPath}`, (error, stdout, stderr) => {
        if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
        if (error) res.json({ error: stderr || error.message });
        else res.json({ output: stdout });
      });
    } else {
      res.status(400).json({ error: `Language ${language} is not supported by the local compiler sandbox.` });
    }
  } catch (err) {
    console.error("Compile error:", err);
    res.status(500).json({ error: "Internal server error during compilation" });
  }
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
