'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

interface Message {
  id: string;
  chatId: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
}

interface UseSocketReturn {
  socket: Socket | null;
  isConnected: boolean;
  isAuthenticated: boolean;
  onlineUsers: string[];
  typingUsers: Map<string, string[]>;
  sendMessage: (chatId: string, content: string) => void;
  sendTyping: (chatId: string, isTyping: boolean) => void;
  markAsRead: (chatId: string) => void;
  joinChat: (chatId: string) => void;
  leaveChat: (chatId: string) => void;
  messages: Message[];
}

export function useSocket(userId?: string, token?: string): UseSocketReturn {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [typingUsers, setTypingUsers] = useState<Map<string, string[]>>(new Map());
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!userId || !token) return;

    // Initialize socket connection
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || window.location.origin, {
      path: '/api/socket',
      transports: ['websocket', 'polling'],
    });

    socketRef.current = socket;

    // Connection events
    socket.on('connect', () => {
      console.log('Socket connected');
      setIsConnected(true);
      
      // Authenticate after connection
      socket.emit('authenticate', { userId, token });
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
      setIsConnected(false);
      setIsAuthenticated(false);
    });

    socket.on('authenticated', (data: { success: boolean }) => {
      if (data.success) {
        setIsAuthenticated(true);
      }
    });

    // Message events
    socket.on('new_message', (message: Message) => {
      setMessages(prev => [...prev, message]);
    });

    // Typing events
    socket.on('user_typing', (data: { userId: string; userName: string; isTyping: boolean; chatId: string }) => {
      setTypingUsers(prev => {
        const newMap = new Map(prev);
        const currentTypers = newMap.get(data.chatId) || [];
        
        if (data.isTyping) {
          if (!currentTypers.includes(data.userName)) {
            newMap.set(data.chatId, [...currentTypers, data.userName]);
          }
        } else {
          newMap.set(data.chatId, currentTypers.filter(name => name !== data.userName));
        }
        
        return newMap;
      });
    });

    // User status events
    socket.on('user_status', (data: { userId: string; isOnline: boolean }) => {
      setOnlineUsers(prev => {
        if (data.isOnline) {
          return [...new Set([...prev, data.userId])];
        } else {
          return prev.filter(id => id !== data.userId);
        }
      });
    });

    // Error handling
    socket.on('error', (error: { message: string }) => {
      console.error('Socket error:', error.message);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, token]);

  const sendMessage = useCallback((chatId: string, content: string) => {
    if (!socketRef.current || !isAuthenticated) return;

    socketRef.current.emit('send_message', {
      chatId,
      content,
      senderId: userId,
      timestamp: new Date().toISOString()
    });
  }, [isAuthenticated, userId]);

  const sendTyping = useCallback((chatId: string, isTyping: boolean) => {
    if (!socketRef.current || !isAuthenticated) return;

    socketRef.current.emit('typing', {
      chatId,
      userId,
      isTyping
    });
  }, [isAuthenticated, userId]);

  const markAsRead = useCallback((chatId: string) => {
    if (!socketRef.current || !isAuthenticated) return;

    socketRef.current.emit('mark_read', { chatId, userId });
  }, [isAuthenticated, userId]);

  const joinChat = useCallback((chatId: string) => {
    if (!socketRef.current) return;
    socketRef.current.emit('join_chat', chatId);
  }, []);

  const leaveChat = useCallback((chatId: string) => {
    if (!socketRef.current) return;
    socketRef.current.emit('leave_chat', chatId);
  }, []);

  return {
    socket: socketRef.current,
    isConnected,
    isAuthenticated,
    onlineUsers,
    typingUsers,
    sendMessage,
    sendTyping,
    markAsRead,
    joinChat,
    leaveChat,
    messages
  };
}
