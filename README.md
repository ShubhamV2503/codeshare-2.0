# SyncCode - Real-Time Collaborative Code Editor

A real-time collaborative code-sharing web application built with Next.js, Tailwind CSS, Monaco Editor, Express, and Socket.io.

## Prerequisites
- [Node.js](https://nodejs.org/) (v16.x or newer recommended)
- npm or yarn

## Project Structure
The project is set up as a monorepo containing:
- `client/` - Next.js React frontend
- `server/` - Express + Socket.io backend

## Installation & Setup

### 1. Backend Server Setup
Open a terminal and navigate to the backend directory:
```bash
cd server
npm install
```
Start the backend server:
```bash
node src/index.js
```
The server will start running on port `4000` (`http://localhost:4000`).

### 2. Frontend Client Setup
Open a **new** terminal and navigate to the frontend directory:
```bash
cd client
npm install
```
Start the frontend development server:
```bash
npm run dev
```
The client will start running on port `3000` (`http://localhost:3000`).

## Usage
1. Open your browser and go to `http://localhost:3000`.
2. Click **Create Instant Room** to generate a unique room ID and enter the workspace.
3. Share the URL with anyone to collaborate in real-time.
4. Select different languages, toggle dark/light themes, and use the read-only mode to prevent edits from others.

## Features Added:
- **Instant Room Creation:** Uses UUIDs to rapidly spawn rooms.
- **Real-Time Collaboration:** Socket.io cleanly syncs Monaco Editor text changes.
- **Editor Functionality:** Dropdowns for multiple languages, themes, and instant syntax highlighting.
- **Read-Only Mode:** Simple toggle switch to freeze code sharing.
- **Modern Aesthetics:** Vibrant Tailwind gradients with the `lucide-react` icon set.
