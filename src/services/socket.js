import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
  }

  // Initialize socket connection
  connect() {
    if (this.socket) return;

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Authentication token required for socket connection');
      return;
    }

    this.socket = io('https://campus-swap-api.onrender.com', {
      auth: { token },
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.socket.on('connect', () => {
      this.isConnected = true;
      console.log('Socket connected');
    });

    this.socket.on('disconnect', () => {
      this.isConnected = false;
      console.log('Socket disconnected');
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    return this.socket;
  }

  // Disconnect socket
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  // Send a chat message
  sendMessage(message) {
    if (!this.socket || !this.isConnected) {
      console.error('Socket not connected');
      return;
    }

    this.socket.emit('chat message', message);
  }

  // Subscribe to incoming messages
  onMessage(callback) {
    if (!this.socket) {
      console.error('Socket not initialized');
      return;
    }

    this.socket.on('chat message', callback);
    return () => this.socket.off('chat message', callback);
  }
}

// Create a singleton instance
const socketService = new SocketService();
export default socketService;