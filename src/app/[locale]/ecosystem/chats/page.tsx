"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import { 
  MessageCircle, 
  Search, 
  Send, 
  MoreVertical,
  Phone,
  Video,
  Paperclip,
  Smile,
  Check,
  CheckCheck,
  Loader2,
  ArrowLeft
} from "lucide-react";

interface Chat {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageAt?: string;
  unreadCount: number;
  isOnline?: boolean;
  type: 'direct' | 'group';
  participants?: { id: string; name: string; avatar?: string }[];
}

interface Message {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
  isRead?: boolean;
}

// Messaging system coming soon - no data yet
const mockChats: Chat[] = [];

const mockMessages: Record<string, Message[]> = {};

export default function ChatsPage() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // WebSocket connection will be initialized when auth is available
  // const { isConnected, isAuthenticated, sendMessage, sendTyping, typingUsers } = useSocket(userId, token);
  const isConnected = false;
  const isAuthenticated = false;
  const typingUsers = new Map();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (selectedChat) {
      setMessages(mockMessages[selectedChat.id] || []);
      // Join chat room
      // joinChat(selectedChat.id);
    }
  }, [selectedChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim() || !selectedChat) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage.trim(),
      sender: { id: "me", name: "You" },
      createdAt: new Date().toISOString()
    };

    setMessages(prev => [...prev, message]);
    
    // Send via WebSocket
    // sendMessage(selectedChat.id, newMessage);
    
    setNewMessage("");
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-16 bg-ocean-950">
        <div className="flex h-[calc(100vh-64px)]">
          {/* Chat List */}
          <AnimatePresence mode="popLayout">
            {(!selectedChat || !isMobile) && (
              <motion.div
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                className={`${selectedChat ? 'hidden md:flex' : 'flex'} w-full md:w-80 lg:w-96 flex-col border-r border-white/10 bg-ocean-900/50`}
              >
                {/* Header */}
                <div className="p-4 border-b border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <h1 className="text-xl font-bold text-white">Messages</h1>
                    <div className="flex items-center gap-2">
                      {isConnected && (
                        <span className="w-2 h-2 rounded-full bg-emerald-500" title="Connected" />
                      )}
                      <button className="p-2 hover:bg-white/10 rounded-lg">
                        <MessageCircle className="w-5 h-5 text-water-400" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search chats..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-water-500/50"
                    />
                  </div>
                </div>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto">
                  {filteredChats.map((chat) => (
                    <button
                      key={chat.id}
                      onClick={() => setSelectedChat(chat)}
                      className={`w-full p-4 flex items-center gap-3 hover:bg-white/5 transition-colors border-b border-white/5 ${
                        selectedChat?.id === chat.id ? 'bg-water-500/10' : ''
                      }`}
                    >
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-water-500 to-cyan-500 flex items-center justify-center text-white font-medium">
                          {chat.name[0].toUpperCase()}
                        </div>
                        {chat.isOnline && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-ocean-900" />
                        )}
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-white truncate">{chat.name}</h3>
                          {chat.lastMessageAt && (
                            <span className="text-xs text-slate-400">
                              {formatTime(chat.lastMessageAt)}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-slate-400 truncate pr-2">
                            {chat.lastMessage || "No messages yet"}
                          </p>
                          {chat.unreadCount > 0 && (
                            <span className="px-2 py-0.5 bg-water-500 text-white text-xs rounded-full">
                              {chat.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat Window */}
          <AnimatePresence mode="popLayout">
            {selectedChat && (
              <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                className="flex-1 flex flex-col bg-ocean-950"
              >
                {/* Chat Header */}
                <div className="flex items-center gap-4 p-4 border-b border-white/10 bg-ocean-900/30">
                  {isMobile && (
                    <button
                      onClick={() => setSelectedChat(null)}
                      className="p-2 hover:bg-white/10 rounded-lg"
                    >
                      <ArrowLeft className="w-5 h-5 text-slate-400" />
                    </button>
                  )}
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-water-500 to-cyan-500 flex items-center justify-center text-white font-medium">
                      {selectedChat.name[0].toUpperCase()}
                    </div>
                    {selectedChat.isOnline && (
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-ocean-900" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h2 className="font-semibold text-white">{selectedChat.name}</h2>
                    <p className="text-xs text-slate-400">
                      {selectedChat.isOnline ? 'Online' : 'Offline'}
                      {typingUsers.get(selectedChat?.id || '')?.length ? (
                        <span className="text-water-400 ml-2">
                          typing...
                        </span>
                      ) : null}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400">
                      <Phone className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400">
                      <Video className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400">
                      <MoreVertical className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message, index) => {
                    const isMe = message.sender.id === "me";
                    const showAvatar = index === 0 || messages[index - 1].sender.id !== message.sender.id;
                    
                    return (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''}`}
                      >
                        {showAvatar && !isMe ? (
                          <div className="w-8 h-8 rounded-full bg-water-500/20 flex items-center justify-center text-xs text-water-400 font-medium flex-shrink-0">
                            {message.sender.name[0].toUpperCase()}
                          </div>
                        ) : (
                          !isMe && <div className="w-8 flex-shrink-0" />
                        )}
                        
                        <div className={`max-w-[70%] ${isMe ? 'items-end' : 'items-start'}`}>
                          {showAvatar && !isMe && (
                            <span className="text-xs text-slate-500 mb-1 block">
                              {message.sender.name}
                            </span>
                          )}
                          <div
                            className={`px-4 py-2 rounded-2xl ${
                              isMe
                                ? 'bg-water-500 text-white rounded-br-md'
                                : 'bg-white/10 text-slate-200 rounded-bl-md'
                            }`}
                          >
                            <p>{message.content}</p>
                          </div>
                          <div className={`flex items-center gap-1 mt-1 text-xs text-slate-500 ${isMe ? 'justify-end' : ''}`}>
                            <span>{formatTime(message.createdAt)}</span>
                            {isMe && (
                              message.isRead ? (
                                <CheckCheck className="w-3 h-3 text-water-400" />
                              ) : (
                                <Check className="w-3 h-3" />
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/10 bg-ocean-900/30">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-white/10 rounded-lg text-slate-400">
                      <Paperclip className="w-5 h-5" />
                    </button>
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => {
                          setNewMessage(e.target.value);
                          // sendTyping(selectedChat.id, e.target.value.length > 0);
                        }}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type a message..."
                        className="w-full bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-water-500/50"
                      />
                      <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/10 rounded-lg text-slate-400">
                        <Smile className="w-5 h-5" />
                      </button>
                    </div>
                    <button
                      onClick={handleSend}
                      disabled={!newMessage.trim()}
                      className="p-3 bg-water-500 hover:bg-water-600 disabled:bg-slate-700 disabled:cursor-not-allowed text-white rounded-full transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty State */}
          {!selectedChat && !isMobile && (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Messaging Coming Soon</h3>
                <p className="text-slate-400 max-w-md">
                  The messaging system is currently under development. Soon you will be able to chat with project teams, DAO members, and other users.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
