import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';

interface ChatMessage {
  chatId: string;
  content: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  timestamp: string;
}

interface TypingEvent {
  chatId: string;
  userId: string;
  userName: string;
  isTyping: boolean;
}

// In-memory storage for demo (replace with DB in production)
const userSockets: Map<string, string> = new Map();
const chatRooms: Map<string, Set<string>> = new Map();

export class WebSocketServer {
  private io: SocketIOServer | null = null;

  initialize(server: HTTPServer) {
    this.io = new SocketIOServer(server, {
      path: '/api/socket',
      cors: {
        origin: '*',
        methods: ['GET', 'POST']
      }
    });

    this.io.on('connection', (socket: Socket) => {
      console.log('Client connected:', socket.id);

      // Authenticate user
      socket.on('authenticate', async (data: { userId: string; token: string }) => {
        try {
          // TODO: Verify session with database
          // For now, accept any token for demo
          
          userSockets.set(data.userId, socket.id);
          socket.data.userId = data.userId;

          socket.emit('authenticated', { success: true });
          
          // Broadcast user online status
          this.broadcastUserStatus(data.userId, true);
          
          console.log(`User ${data.userId} authenticated`);
        } catch (error) {
          console.error('Authentication error:', error);
          socket.emit('error', { message: 'Authentication failed' });
        }
      });

      // Handle joining a chat
      socket.on('join_chat', (chatId: string) => {
        socket.join(`chat:${chatId}`);
        
        if (!chatRooms.has(chatId)) {
          chatRooms.set(chatId, new Set());
        }
        chatRooms.get(chatId)?.add(socket.id);
        
        console.log(`Socket ${socket.id} joined chat ${chatId}`);
      });

      // Handle leaving a chat
      socket.on('leave_chat', (chatId: string) => {
        socket.leave(`chat:${chatId}`);
        chatRooms.get(chatId)?.delete(socket.id);
        console.log(`Socket ${socket.id} left chat ${chatId}`);
      });

      // Handle new message
      socket.on('send_message', async (data: ChatMessage) => {
        try {
          // TODO: Save to database
          
          const messageData = {
            id: Date.now().toString(),
            chatId: data.chatId,
            content: data.content,
            sender: {
              id: data.senderId,
              name: data.senderName,
              avatar: data.senderAvatar
            },
            createdAt: new Date().toISOString()
          };

          // Broadcast to all users in chat
          this.io?.to(`chat:${data.chatId}`).emit('new_message', messageData);

        } catch (error) {
          console.error('Send message error:', error);
          socket.emit('error', { message: 'Failed to send message' });
        }
      });

      // Handle typing indicator
      socket.on('typing', (data: TypingEvent) => {
        socket.to(`chat:${data.chatId}`).emit('user_typing', {
          userId: data.userId,
          userName: data.userName,
          isTyping: data.isTyping
        });
      });

      // Handle mark as read
      socket.on('mark_read', async (data: { chatId: string; userId: string }) => {
        socket.to(`chat:${data.chatId}`).emit('messages_read', {
          userId: data.userId,
          chatId: data.chatId
        });
      });

      // Handle disconnect
      socket.on('disconnect', () => {
        const userId = socket.data.userId;
        if (userId) {
          userSockets.delete(userId);
          this.broadcastUserStatus(userId, false);
          console.log(`User ${userId} disconnected`);
        }
        console.log('Client disconnected:', socket.id);
      });
    });

    console.log('WebSocket server initialized');
  }

  private broadcastUserStatus(userId: string, isOnline: boolean) {
    this.io?.emit('user_status', { userId, isOnline });
  }

  // Public methods for server-side events
  broadcastToChat(chatId: string, event: string, data: any) {
    this.io?.to(`chat:${chatId}`).emit(event, data);
  }

  broadcastToUser(userId: string, event: string, data: any) {
    const socketId = userSockets.get(userId);
    if (socketId) {
      this.io?.to(socketId).emit(event, data);
    }
  }

  broadcastGlobal(event: string, data: any) {
    this.io?.emit(event, data);
  }
}

export const wsServer = new WebSocketServer();
