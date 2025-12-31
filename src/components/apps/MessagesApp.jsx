import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MessagesApp = ({ onClose }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  
  const chats = [
    { id: 1, name: 'Zencoder', lastMsg: 'iOS 26 is looking great!', time: '12:45', color: 'bg-blue-500' },
    { id: 2, name: 'Mama', lastMsg: 'Kiedy będziesz w domu?', time: '11:20', color: 'bg-pink-500' },
    { id: 3, name: 'John Doe', lastMsg: 'Sent a photo', time: 'Yesterday', color: 'bg-gray-500' },
    { id: 4, name: 'Alice', lastMsg: 'Haha exactly!', time: 'Tuesday', color: 'bg-purple-500' },
  ];

  const messages = [
    { id: 1, text: 'Hey, how is the refactor going?', sender: 'them' },
    { id: 2, text: 'Its going well! The animations are much smoother now.', sender: 'me' },
    { id: 3, text: 'Great! Did you fix the Dynamic Island?', sender: 'them' },
    { id: 4, text: 'Yes, it is now taller and has a buffer zone.', sender: 'me' },
    { id: 5, text: 'Perfect! 🚀', sender: 'them' },
  ];

  return (
    <div className="w-full h-full bg-white flex flex-col">
      <AnimatePresence mode="wait">
        {!selectedChat ? (
          <motion.div 
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex-1 flex flex-col pt-14"
          >
            <div className="px-6 mb-6 flex justify-between items-center">
               <h1 className="text-3xl font-bold text-black">Messages</h1>
               <button className="text-blue-500 text-2xl">📝</button>
            </div>
            
            <div className="px-4">
              <div className="bg-gray-100 rounded-xl px-4 py-2 flex items-center gap-2 mb-6">
                <span className="text-gray-400">🔍</span>
                <input type="text" placeholder="Search" className="bg-transparent border-none outline-none text-black w-full" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-2">
              {chats.map(chat => (
                <button 
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 active:bg-gray-100 rounded-2xl transition-colors text-left"
                >
                  <div className={`w-14 h-14 rounded-full ${chat.color} flex items-center justify-center text-white text-xl font-bold shadow-sm`}>
                    {chat.name[0]}
                  </div>
                  <div className="flex-1 border-b border-gray-100 pb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-black">{chat.name}</span>
                      <span className="text-xs text-gray-400">{chat.time}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate">{chat.lastMsg}</p>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="chat"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex-1 flex flex-col bg-white pt-14"
          >
            {/* Chat Header */}
            <div className="px-4 py-2 flex items-center gap-2 border-b border-gray-100">
               <button onClick={() => setSelectedChat(null)} className="text-blue-500 text-lg flex items-center">
                 <span className="text-2xl mr-1">‹</span> Messages
               </button>
               <div className="flex-1 flex flex-col items-center">
                 <div className={`w-8 h-8 rounded-full ${selectedChat.color} flex items-center justify-center text-white text-xs font-bold mb-0.5`}>
                   {selectedChat.name[0]}
                 </div>
                 <span className="text-[10px] font-medium text-gray-500">{selectedChat.name}</span>
               </div>
               <div className="w-20" /> {/* Spacer */}
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
               {messages.map(msg => (
                 <div 
                   key={msg.id}
                   className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${
                     msg.sender === 'me' 
                     ? 'bg-blue-500 text-white self-end rounded-br-none' 
                     : 'bg-gray-100 text-black self-start rounded-bl-none'
                   }`}
                 >
                   {msg.text}
                 </div>
               ))}
            </div>

            {/* Input Area */}
            <div className="p-4 pb-8 flex items-center gap-3">
               <button className="text-gray-400 text-2xl">⊕</button>
               <div className="flex-1 bg-gray-100 rounded-full px-4 py-2 border border-gray-200">
                  <input type="text" placeholder="iMessage" className="bg-transparent border-none outline-none w-full text-black" />
               </div>
               <button className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  ↑
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MessagesApp;
