"use client";

import { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { io } from 'socket.io-client';
import Link from 'next/link';
import { Copy, Download, Users, Check, ChevronDown, Timer, Play, Pause, RotateCcw, Pencil, Trash2, PlayCircle, Terminal, X } from 'lucide-react';
import { useTheme } from 'next-themes';

import {
    SiJavascript, SiTypescript, SiPython, SiCplusplus, SiC, SiGo,
    SiRust, SiPhp, SiRuby, SiSwift, SiKotlin, SiScala, SiR, SiHtml5, SiCss, SiJson
} from 'react-icons/si';
import { TbBrandCSharp } from 'react-icons/tb';
import { FaJava, FaFileAlt } from 'react-icons/fa';

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000';

const LANGUAGES = [
    { id: 'javascript', name: 'JavaScript', icon: SiJavascript, color: '#f7df1e' },
    { id: 'typescript', name: 'TypeScript', icon: SiTypescript, color: '#3178c6' },
    { id: 'python', name: 'Python', icon: SiPython, color: '#3776ab' },
    { id: 'java', name: 'Java', icon: FaJava, color: '#f89820' },
    { id: 'cpp', name: 'C++', icon: SiCplusplus, color: '#00599c' },
    { id: 'c', name: 'C', icon: SiC, color: '#a8b9cc' },
    { id: 'csharp', name: 'C#', icon: TbBrandCSharp, color: '#239120' },
    { id: 'go', name: 'Go', icon: SiGo, color: '#00add8' },
    { id: 'rust', name: 'Rust', icon: SiRust, color: '#dea584' },
    { id: 'php', name: 'PHP', icon: SiPhp, color: '#777bb4' },
    { id: 'ruby', name: 'Ruby', icon: SiRuby, color: '#cc342d' },
    { id: 'swift', name: 'Swift', icon: SiSwift, color: '#f05138' },
    { id: 'kotlin', name: 'Kotlin', icon: SiKotlin, color: '#7f52ff' },
    { id: 'scala', name: 'Scala', icon: SiScala, color: '#dc322f' },
    { id: 'r', name: 'R', icon: SiR, color: '#276dc3' },
    { id: 'html', name: 'HTML', icon: SiHtml5, color: '#e34f26' },
    { id: 'css', name: 'CSS', icon: SiCss, color: '#1572b6' },
    { id: 'json', name: 'JSON', icon: SiJson, color: '#000000' },
    { id: 'plaintext', name: 'Text', icon: FaFileAlt, color: '#9ca3af' }
];

function LanguageSelector({ language, setLanguage }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const selectedLang = LANGUAGES.find(l => l.id === language) || LANGUAGES[0];
    const SelectedIcon = selectedLang.icon;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 bg-white dark:bg-[#0d1117] border border-gray-300 dark:border-[#1f2937] text-gray-900 dark:text-white text-sm rounded-md px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all min-w-[140px] justify-between shadow-sm dark:shadow-none"
            >
                <div className="flex items-center gap-2">
                    <SelectedIcon style={{ color: selectedLang.color }} className="text-base" />
                    <span>{selectedLang.name}</span>
                </div>
                <ChevronDown size={14} className={`text-gray-500 dark:text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute top-10 left-0 w-48 bg-white dark:bg-[#0a0a0f] border border-gray-200 dark:border-[#1f2937] rounded-lg shadow-xl dark:shadow-2xl z-50 py-2 max-h-[400px] overflow-y-auto custom-scrollbar">
                    {LANGUAGES.map((lang) => {
                        const Icon = lang.icon;
                        const isSelected = language === lang.id;
                        return (
                            <button
                                key={lang.id}
                                onClick={() => {
                                    setLanguage(lang.id);
                                    setIsOpen(false);
                                }}
                                className={`w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#1f2937] transition-colors ${isSelected ? 'bg-blue-50 dark:bg-blue-600/10' : ''}`}
                            >
                                <div className="flex items-center gap-3">
                                    <Icon style={{ color: lang.color }} className="text-lg" />
                                    <span className={`text-sm ${isSelected ? 'text-blue-700 dark:text-white font-medium' : 'text-gray-700 dark:text-gray-300'}`}>
                                        {lang.name}
                                    </span>
                                </div>
                                {isSelected && <Check size={16} className="text-blue-600 dark:text-white" />}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default function CodeEditor({ roomId }) {
    const [code, setCode] = useState('# Write your code here...');
    const [language, setLanguage] = useState('python');
    const { resolvedTheme } = useTheme();
    const [readOnly, setReadOnly] = useState(false);
    const [users, setUsers] = useState([]);

    // Copy states
    const [copiedId, setCopiedId] = useState(false);
    const [copiedLink, setCopiedLink] = useState(false);

    // Timer states
    const [timer, setTimer] = useState({ duration: 300, remaining: 300, isRunning: false }); // Default 5 mins
    const [timerInput, setTimerInput] = useState('5');
    const [isEditingTimer, setIsEditingTimer] = useState(false);

    // Drawing states
    const [isDrawingMode, setIsDrawingMode] = useState(false);
    const canvasRef = useRef(null);
    const isDrawing = useRef(false);
    const currentStroke = useRef(null);
    const linesRef = useRef([]);

    const socketRef = useRef(null);
    const editorRef = useRef(null);
    const isLocalChange = useRef(false);

    // Keep users in a ref to bypass stale closure issues in socket handlers
    const usersRef = useRef([]);

    // Store cursor decorations per socketId
    const cursorsRef = useRef({});
    const decorationsCollectionRef = useRef(null);

    // Helper to render all current remote cursors
    // Moving it outside useEffect, pulling latest users from the ref
    const renderAllCursors = () => {
        if (!editorRef.current || !editorRef.current.monaco || !decorationsCollectionRef.current) return;

        const newDecorations = [];
        const currentUsers = usersRef.current;

        Object.entries(cursorsRef.current).forEach(([socketId, cursor]) => {
            const user = currentUsers.find(u => u.socketId === socketId);
            if (!user) return;

            const { lineNumber, column } = cursor.position;

            // Optional safeguard against invalid cursor positions
            if (!lineNumber || !column) return;

            newDecorations.push({
                range: new editorRef.current.monaco.Range(lineNumber, column, lineNumber, column),
                options: {
                    className: `remote-cursor remote-cursor-${socketId}`,
                    hoverMessage: { value: user.name },
                    // Inject a custom CSS class to target via DOM
                    after: {
                        content: '\u200B',
                        inlineClassName: `remote-cursor-caret remote-cursor-${socketId}`
                    }
                }
            });
        });

        decorationsCollectionRef.current.set(newDecorations);
    };

    // --- Drawing Helpers ---
    const getLocalUserColor = () => {
        const localUser = usersRef.current.find(u => u.socketId === socketRef.current?.id);
        return localUser ? localUser.color : '#3b82f6';
    };

    const drawLineOnCanvas = (line, ctx) => {
        if (!ctx || !line || line.points.length < 2) return;
        ctx.beginPath();
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.moveTo(line.points[0].x, line.points[0].y);
        for (let i = 1; i < line.points.length; i++) {
            ctx.lineTo(line.points[i].x, line.points[i].y);
        }
        ctx.stroke();
    };

    const drawAllLines = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            linesRef.current.forEach(line => drawLineOnCanvas(line, ctx));
        }
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    };

    const handleCanvasMouseDown = (e) => {
        if (!isDrawingMode) return;
        isDrawing.current = true;
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        currentStroke.current = {
            color: getLocalUserColor(),
            points: [{ x, y }]
        };
    };

    const handleCanvasMouseMove = (e) => {
        if (!isDrawingMode || !isDrawing.current || !currentStroke.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        currentStroke.current.points.push({ x, y });

        // Render just this stroke segment locally
        const ctx = canvasRef.current.getContext('2d');
        const points = currentStroke.current.points;
        if (points.length >= 2) {
            ctx.beginPath();
            ctx.strokeStyle = currentStroke.current.color;
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            const prev = points[points.length - 2];
            const curr = points[points.length - 1];
            ctx.moveTo(prev.x, prev.y);
            ctx.lineTo(curr.x, curr.y);
            ctx.stroke();
        }
    };

    const handleCanvasMouseUp = () => {
        if (!isDrawingMode || !isDrawing.current || !currentStroke.current) return;
        isDrawing.current = false;
        if (currentStroke.current.points.length > 1) {
            linesRef.current.push(currentStroke.current);
            socketRef.current.emit('draw-line', { roomId, line: currentStroke.current });
        }
        currentStroke.current = null;
    };
    // -----------------------

    // --- Code Execution ---
    const [output, setOutput] = useState("");
    const [isOutputOpen, setIsOutputOpen] = useState(false);
    const [isRunningCode, setIsRunningCode] = useState(false);

    const executeCode = async () => {
        if (!code.trim()) return;

        setIsRunningCode(true);
        setIsOutputOpen(true);
        setOutput("Executing code...\n");

        if (['html', 'css', 'json', 'plaintext'].includes(language)) {
            setOutput(`Execution is not supported for ${language}.`);
            setIsRunningCode(false);
            return;
        }

        try {
            const response = await fetch(`${SOCKET_SERVER_URL}/api/execute`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    language: language,
                    code: code
                })
            });

            const data = await response.json();

            if (data.output !== undefined) {
                setOutput(data.output || "Program finished with no output.");
            } else if (data.error) {
                setOutput(`Error:\n${data.error}`);
            } else {
                setOutput("Execution failed or returned unrecognized payload.");
            }
        } catch (error) {
            console.error("Execution error:", error);
            setOutput("Network error during execution. Is the backend running?");
        } finally {
            setIsRunningCode(false);
        }
    };
    // -----------------------

    useEffect(() => {
        socketRef.current = io(SOCKET_SERVER_URL);

        socketRef.current.emit('join-room', roomId);

        socketRef.current.on('code-update', (newCode) => {
            isLocalChange.current = false;
            setCode(newCode);
        });

        socketRef.current.on('users-update', (userList) => {
            usersRef.current = userList; // Update the ref explicitly for socket closures
            setUsers(userList);
            renderAllCursors(); // Re-render cursors if user colors/names change
        });

        socketRef.current.on('cursor-update', ({ socketId, cursor }) => {
            if (socketId === socketRef.current.id) return; // Don't render own cursor

            // Store the latest cursor position for this user
            cursorsRef.current[socketId] = cursor;
            renderAllCursors();
        });

        socketRef.current.on('user-disconnected', (socketId) => {
            delete cursorsRef.current[socketId];
            renderAllCursors();
        });

        // Timer Events
        socketRef.current.on('timer-sync', (timerState) => {
            setTimer(timerState);
        });

        socketRef.current.on('timer-tick', (timerState) => {
            setTimer(timerState);
        });

        socketRef.current.on('timer-end', (timerState) => {
            setTimer(timerState);
            // Optional: Play a sound or show browser notification here
        });

        // Drawing Events
        socketRef.current.on('drawing-sync', (syncedLines) => {
            linesRef.current = syncedLines;
            drawAllLines();
        });

        socketRef.current.on('draw-line', (line) => {
            linesRef.current.push(line);
            const canvas = canvasRef.current;
            if (canvas) {
                const ctx = canvas.getContext('2d');
                drawLineOnCanvas(line, ctx);
            }
        });

        socketRef.current.on('clear-canvas', () => {
            linesRef.current = [];
            clearCanvas();
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [roomId]);

    // Handle canvas resizing correctly
    useEffect(() => {
        const resizeCanvas = () => {
            const canvas = canvasRef.current;
            if (canvas && canvas.parentElement) {
                canvas.width = canvas.parentElement.clientWidth;
                canvas.height = canvas.parentElement.clientHeight;
                drawAllLines();
            }
        };
        // Delay slightly on mount to ensure parent is rendered correctly
        setTimeout(resizeCanvas, 100);
        window.addEventListener('resize', resizeCanvas);
        return () => window.removeEventListener('resize', resizeCanvas);
    }, []);



    // --- Timer Controls ---
    const startTimer = () => socketRef.current?.emit('start-timer', roomId);
    const pauseTimer = () => socketRef.current?.emit('pause-timer', roomId);
    const resetTimer = () => socketRef.current?.emit('reset-timer', roomId);

    const applyTimer = () => {
        const mins = parseInt(timerInput, 10);
        if (!isNaN(mins) && mins > 0) {
            socketRef.current?.emit('set-timer', { roomId, duration: mins * 60 });
        }
        setIsEditingTimer(false);
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };
    // -----------------------

    const handleEditorChange = (value) => {
        if (isLocalChange.current) {
            setCode(value);
            socketRef.current.emit('code-change', { roomId, code: value });
        }
    };

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;
        editorRef.current.monaco = monaco;
        decorationsCollectionRef.current = editor.createDecorationsCollection([]);

        // Listen for model content changes to differentiate local vs remote
        editor.onDidChangeModelContent((event) => {
            if (!event.isFlush) {
                isLocalChange.current = true;
            }
        });

        // Listen for local cursor movements and broadcast
        editor.onDidChangeCursorPosition((event) => {
            if (socketRef.current) {
                socketRef.current.emit('cursor-change', {
                    roomId,
                    cursor: {
                        position: {
                            lineNumber: event.position.lineNumber,
                            column: event.position.column
                        }
                    }
                });
            }
        });
    };

    const copyRoomLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
    };

    const copyRoomId = () => {
        navigator.clipboard.writeText(roomId);
        setCopiedId(true);
        setTimeout(() => setCopiedId(false), 2000);
    };

    const downloadCode = () => {
        const extMap = {
            'javascript': 'js',
            'typescript': 'ts',
            'python': 'py',
            'java': 'java',
            'cpp': 'cpp',
            'c': 'c',
            'csharp': 'cs',
            'go': 'go',
            'rust': 'rs',
            'php': 'php',
            'ruby': 'rb',
            'swift': 'swift',
            'kotlin': 'kt',
            'scala': 'scala',
            'r': 'r',
            'html': 'html',
            'css': 'css',
            'json': 'json',
            'plaintext': 'txt'
        };
        const ext = extMap[language] || 'txt';

        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `codeshare_${roomId}.${ext}`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex flex-col h-screen bg-white dark:bg-[#030712] text-gray-900 dark:text-[#f9fafb] transition-colors duration-300">
            {/* Dynamic CSS for remote cursors based on active users */}
            <style dangerouslySetInnerHTML={{
                __html: users.filter(u => u.socketId !== socketRef.current?.id).map(user => `
                    .remote-cursor-${user.socketId} {
                        --cursor-color: ${user.color};
                        --cursor-name: "${user.name}";
                    }
                `).join('\n')
            }} />

            <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-[#1f2937] shadow-sm dark:shadow-lg">
                <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
                    <div className="p-2 bg-blue-100 dark:bg-blue-600/10 rounded-lg group-hover:scale-105 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600 dark:text-blue-500"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-purple-400 dark:to-pink-400">
                            codeshare 2.0
                        </h2>
                    </div>
                </Link>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3 mr-4 border-r border-gray-300 dark:border-[#1f2937] pr-6">
                        <div className="px-3 py-1 bg-gray-200 dark:bg-[#1f2937] rounded-md text-sm font-mono text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <span>Room: {roomId.substring(0, 8)}</span>
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(roomId);
                                    setCopiedId(true);
                                    setTimeout(() => setCopiedId(false), 2000);
                                }}
                                className={`${copiedId ? 'text-emerald-500 dark:text-emerald-400' : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'} transition-colors cursor-pointer`}
                                title="Copy Room ID"
                            >
                                {copiedId ? <Check size={14} /> : <Copy size={14} />}
                            </button>
                        </div>
                        <div className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-md text-sm font-medium flex items-center gap-2 pointer-events-none">
                            <Users size={16} /> {Math.max(1, users.length)} Online
                        </div>
                    </div>

                    {/* --- Timer UI --- */}
                    <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-[#1f2937] rounded-md border border-gray-200 dark:border-gray-700">
                        <Timer size={16} className={`${timer.remaining <= 60 && timer.isRunning ? 'text-red-500 animate-pulse' : 'text-gray-500 dark:text-gray-400'}`} />

                        {isEditingTimer ? (
                            <div className="flex items-center gap-1">
                                <input
                                    type="number"
                                    min="1"
                                    max="120"
                                    value={timerInput}
                                    onChange={(e) => setTimerInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && applyTimer()}
                                    className="w-12 px-1 text-sm bg-white dark:bg-[#0d1117] border border-gray-300 dark:border-gray-600 rounded text-center outline-none focus:border-blue-500"
                                    autoFocus
                                />
                                <span className="text-xs text-gray-500">min</span>
                                <button onClick={applyTimer} className="ml-1 text-green-600 dark:text-green-400 hover:text-green-700">
                                    <Check size={14} />
                                </button>
                            </div>
                        ) : (
                            <span
                                className={`text-sm font-mono font-bold cursor-pointer hover:opacity-80 transition-opacity ${timer.remaining <= 60 && timer.isRunning ? 'text-red-500' : 'text-gray-700 dark:text-gray-200'}`}
                                onClick={() => !timer.isRunning && setIsEditingTimer(true)}
                                title={timer.isRunning ? "Pause to edit" : "Click to set minutes"}
                            >
                                {formatTime(timer.remaining)}
                            </span>
                        )}

                        <div className="flex items-center gap-1 ml-2 border-l border-gray-300 dark:border-gray-600 pl-2">
                            {timer.isRunning ? (
                                <button onClick={pauseTimer} className="text-gray-500 hover:text-orange-500 transition-colors" title="Pause">
                                    <Pause size={14} />
                                </button>
                            ) : (
                                <button onClick={startTimer} className="text-gray-500 hover:text-green-500 transition-colors" title="Start">
                                    <Play size={14} />
                                </button>
                            )}
                            <button onClick={resetTimer} className="text-gray-500 hover:text-blue-500 transition-colors" title="Reset">
                                <RotateCcw size={14} />
                            </button>
                        </div>
                    </div>
                    {/* ---------------- */}

                    <LanguageSelector language={language} setLanguage={setLanguage} />

                    <button
                        onClick={executeCode}
                        disabled={isRunningCode || language === 'html' || language === 'css' || language === 'json' || language === 'plaintext'}
                        className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${isRunningCode || language === 'html' || language === 'css' || language === 'json' || language === 'plaintext'
                            ? 'bg-gray-200 dark:bg-[#1f2937] text-gray-400 cursor-not-allowed border border-transparent'
                            : 'bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-400 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50'
                            }`}
                        title="Run Code"
                    >
                        {isRunningCode ? (
                            <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <PlayCircle size={16} />
                        )}
                        Run Code
                    </button>

                    <button
                        onClick={downloadCode}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm border border-gray-300 dark:border-[#1f2937] hover:bg-gray-100 dark:hover:bg-[#1f2937] transition-all text-gray-700 dark:text-gray-300"
                        title="Download Code"
                    >
                        <Download size={16} />
                        Download
                    </button>

                    <button
                        onClick={() => setIsDrawingMode(!isDrawingMode)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm border transition-all ${isDrawingMode ? 'bg-blue-100 dark:bg-blue-900/30 border-blue-400 text-blue-700 dark:text-blue-400' : 'border-gray-300 dark:border-[#1f2937] hover:bg-gray-100 dark:hover:bg-[#1f2937] text-gray-700 dark:text-gray-300'}`}
                        title="Toggle Multi-Cursor Draw Mode"
                    >
                        <Pencil size={16} />
                        Draw
                    </button>

                    {isDrawingMode && (
                        <button
                            onClick={() => {
                                linesRef.current = [];
                                clearCanvas();
                                socketRef.current?.emit('clear-canvas', roomId);
                            }}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm border border-red-300 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all text-red-600 dark:text-red-400"
                            title="Clear Canvas"
                        >
                            <Trash2 size={16} />
                            Clear
                        </button>
                    )}

                    <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer border border-gray-300 dark:border-[#1f2937] px-3 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-[#1f2937] transition-all">
                        <input
                            type="checkbox"
                            checked={readOnly}
                            onChange={(e) => setReadOnly(e.target.checked)}
                            className="accent-blue-600 dark:accent-blue-500 rounded bg-white dark:bg-[#1f2937] border-gray-300 dark:border-gray-600"
                        />
                        Read Only
                    </label>

                    <button
                        onClick={copyRoomLink}
                        className="flex items-center gap-2 px-4 py-1.5 bg-gray-900 dark:bg-[#1f2937] hover:bg-gray-800 dark:hover:bg-gray-700 text-white rounded-md text-sm font-medium transition-all w-32 justify-center"
                    >
                        {copiedLink ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                        {copiedLink ? 'Copied!' : 'Copy Link'}
                    </button>
                </div>
            </div>

            <div className="flex-1 w-full relative flex flex-col">
                <div className="flex-1 relative">
                    <Editor
                        height="100%"
                        language={language}
                        theme={resolvedTheme === 'light' ? 'light' : 'vs-dark'}
                        value={code}
                        onChange={handleEditorChange}
                        onMount={handleEditorDidMount}
                        options={{
                            readOnly: readOnly,
                            minimap: { enabled: false },
                            fontSize: 14,
                            wordWrap: "on",
                            scrollBeyondLastLine: false,
                            smoothScrolling: true,
                            padding: { top: 16 }
                        }}
                        loading={<div className="flex items-center justify-center h-full text-gray-500">Loading Editor...</div>}
                    />
                    <canvas
                        ref={canvasRef}
                        onMouseDown={handleCanvasMouseDown}
                        onMouseMove={handleCanvasMouseMove}
                        onMouseUp={handleCanvasMouseUp}
                        onMouseLeave={handleCanvasMouseUp}
                        className="absolute top-0 left-0 w-full h-full z-10 touch-none"
                        style={{ pointerEvents: isDrawingMode ? 'auto' : 'none' }}
                    />
                </div>

                {/* --- Output Panel --- */}
                {isOutputOpen && (
                    <div className="h-64 border-t border-gray-300 dark:border-[#1f2937] bg-[#fdfdfd] dark:bg-[#0d1117] flex flex-col shrink-0 transition-all duration-300 ease-in-out">
                        <div className="flex justify-between items-center px-4 py-2 border-b border-gray-200 dark:border-[#1f2937] bg-gray-50 dark:bg-[#0a0a0f]">
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                                <Terminal size={16} />
                                Console Output
                            </div>
                            <button
                                onClick={() => setIsOutputOpen(false)}
                                className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors"
                            >
                                <X size={16} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-auto p-4 custom-scrollbar">
                            <pre className="font-mono text-sm whitespace-pre-wrap text-gray-800 dark:text-gray-300">
                                {output || <span className="text-gray-500 italic">No output</span>}
                            </pre>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
