import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Search, Edit3, Plus, ArrowUp, MoreHorizontal, Camera, Mic, Image as ImageIcon } from 'lucide-react';
import { playSound } from '../../hooks/useSoundEffects';

const MessagesApp = ({ onClose }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef(null);

  const chats = [
    { id: 1, name: 'Zencoder', lastMsg: 'iOS 26 is looking great!', time: '12:45', color: 'bg-gradient-to-br from-blue-400 to-blue-600', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop' },
    { id: 2, name: 'Mama', lastMsg: 'Kiedy będziesz w domu?', time: '11:20', color: 'bg-gradient-to-br from-pink-400 to-pink-600', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop' },
    { id: 3, name: 'John Doe', lastMsg: 'Sent a photo', time: 'Yesterday', color: 'bg-gradient-to-br from-gray-400 to-gray-600', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop' },
    { id: 4, name: 'Alice', lastMsg: 'Haha exactly!', time: 'Tuesday', color: 'bg-gradient-to-br from-purple-400 to-purple-600', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop' },
  ];

  const [messages, setMessages] = useState([
    { id: 1, text: 'Hey, how is the refactor going?', sender: 'them', time: '12:40 PM' },
    { id: 2, text: 'Its going well! The animations are much smoother now.', sender: 'me', time: '12:41 PM' },
    { id: 3, text: 'Great! Did you fix the Dynamic Island?', sender: 'them', time: '12:42 PM' },
    { id: 4, text: 'Yes, it is now taller and has a buffer zone.', sender: 'me', time: '12:43 PM' },
    { id: 5, text: 'Perfect! Check this out.', sender: 'them', time: '12:44 PM' },
  ]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [selectedChat, messages]);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    playSound('tick');
    setMessages([...messages, {
      id: Date.now(),
      text: inputText,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
    setInputText('');
  };

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-hidden">
      <AnimatePresence mode="wait">
        {!selectedChat ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col pt-14"
          >
            <div className="px-6 mb-4 flex justify-between items-end">
              <h1 className="text-3xl font-bold text-black tracking-tight">Messages</h1>
              <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-blue-500 active:scale-90 transition-transform">
                <Edit3 size={20} />
              </button>
            </div>

            <div className="px-6 mb-6">
              <div className="bg-gray-100/80 backdrop-blur-md rounded-2xl px-4 py-2.5 flex items-center gap-2 border border-black/5">
                <Search className="text-gray-400" size={18} />
                <input type="text" placeholder="Search" className="bg-transparent border-none outline-none text-black w-full text-[17px] placeholder-gray-400" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 space-y-1">
              {chats.map(chat => (
                <motion.button
                  key={chat.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    playSound('tick');
                    setSelectedChat(chat);
                  }}
                  className="w-full flex items-center gap-4 p-3 rounded-3xl hover:bg-gray-50 active:bg-gray-100 transition-all text-left group"
                >
                  <div className={`w-16 h-16 rounded-full overflow-hidden shadow-sm relative`}>
                    <img src={chat.avatar} alt={chat.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center h-16 border-b border-gray-100 group-last:border-none">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="font-bold text-[17px] text-black tracking-tight">{chat.name}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-gray-400 font-medium">{chat.time}</span>
                        <ChevronLeft size={16} className="text-gray-300 rotate-180" />
                      </div>
                    </div>
                    <p className="text-[15px] text-gray-500 truncate max-w-[200px] leading-snug">{chat.lastMsg}</p>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="flex-1 flex flex-col bg-white pt-14 h-full relative"
          >
            {/* Immersive Chat Header */}
            <div className="px-4 py-3 flex items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur-2xl z-30 sticky top-0">
              <button onClick={() => setSelectedChat(null)} className="text-blue-500 font-medium flex items-center gap-1 active:opacity-50">
                <ChevronLeft size={28} />
              </button>

              <div className="flex flex-col items-center flex-1">
                <div className="w-10 h-10 rounded-full overflow-hidden mb-1 shadow-sm border border-black/5">
                  <img src={selectedChat.avatar} alt="" className="w-full h-full object-cover" />
                </div>
                <span className="text-[11px] font-bold text-gray-900 tracking-wide uppercase">{selectedChat.name}</span>
              </div>

              <button className="text-blue-500 font-medium active:opacity-50">
                <MoreHorizontal size={24} />
              </button>
            </div>

            {/* Messages HUD Area */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 pt-4 pb-32 flex flex-col gap-2 no-scrollbar"
            >
              <div className="text-center py-4 mb-2">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">iMessage • Today</span>
              </div>

              {messages.map((msg, idx) => {
                const isMe = msg.sender === 'me';
                const nextIsMe = messages[idx + 1]?.sender === msg.sender;

                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} ${nextIsMe ? 'mb-0.5' : 'mb-3'}`}
                  >
                    <div
                      className={`max-w-[75%] px-4 py-2.5 shadow-sm ${isMe
                          ? 'bg-gradient-to-br from-blue-400 to-blue-600 text-white rounded-[20px] rounded-br-[4px]'
                          : 'bg-gray-100 text-black rounded-[20px] rounded-bl-[4px]'
                        } text-[15px] leading-tight font-medium`}
                    >
                      {msg.text}
                    </div>
                    {!nextIsMe && (
                      <span className="text-[10px] text-gray-400 mt-1 font-bold px-1">
                        {isMe ? 'Delivered' : msg.time}
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Floating Glass Input HUD */}
            <div className="absolute bottom-6 left-0 right-0 px-4 z-40 bg-gradient-to-t from-white via-white/80 to-transparent pt-10">
              <div className="bg-white/90 backdrop-blur-2xl border border-black/5 rounded-[32px] p-1.5 flex items-center gap-2 shadow-2xl shadow-black/10">
                <button className="w-9 h-9 flex items-center justify-center text-gray-400 hover:text-blue-500 active:scale-90 transition-transform">
                  <Plus size={22} />
                </button>

                <div className="flex-1 flex items-center">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="iMessage"
                    className="w-full bg-transparent border-none outline-none text-[16px] text-black px-2 py-2 placeholder-gray-400 font-medium"
                  />
                </div>

                <div className="flex items-center gap-1 pr-1">
                  {inputText.trim() ? (
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      onClick={handleSendMessage}
                      className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-lg active:scale-90"
                    >
                      <ArrowUp size={20} strokeWidth={3} />
                    </motion.button>
                  ) : (
                    <>
                      <button className="w-9 h-9 flex items-center justify-center text-gray-400 active:scale-90"><ImageIcon size={20} /></button>
                      <button className="w-9 h-9 flex items-center justify-center text-gray-400 active:scale-90"><Camera size={20} /></button>
                      <button className="w-9 h-9 flex items-center justify-center text-gray-400 active:scale-90"><Mic size={20} /></button>
                    </>
                  )}
                </div>
              </div>
              <div className="w-32 h-1.5 bg-black/10 rounded-full mx-auto mt-6 mb-2" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MessagesApp;
