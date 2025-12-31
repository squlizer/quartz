import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Delete, Star, Clock, UserCircle, Grid, Voicemail } from 'lucide-react';

const PhoneApp = ({ onClose }) => {
  const [number, setNumber] = useState('');
  const [activeTab, setActiveTab] = useState('keypad');

  const keypad = [
    { num: '1', letters: '' }, { num: '2', letters: 'ABC' }, { num: '3', letters: 'DEF' },
    { num: '4', letters: 'GHI' }, { num: '5', letters: 'JKL' }, { num: '6', letters: 'MNO' },
    { num: '7', letters: 'PQRS' }, { num: '8', letters: 'TUV' }, { num: '9', letters: 'WXYZ' },
    { num: '*', letters: '' }, { num: '0', letters: '+' }, { num: '#', letters: '' }
  ];

  const handleKeyPress = (num) => {
    if (number.length < 15) setNumber(prev => prev + num);
  };

  const deleteLast = () => {
    setNumber(prev => prev.slice(0, -1));
  };

  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Header */}
      <div className="pt-14 px-6 pb-2">
        <div className="flex justify-between items-center mb-4">
           <h1 className="text-3xl font-bold text-black capitalize">{activeTab}</h1>
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {activeTab === 'keypad' ? (
            <motion.div 
              key="keypad"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full flex flex-col items-center pt-4"
            >
              <div className="h-20 flex items-center justify-center w-full px-10 mb-8">
                <span className="text-4xl font-light text-black tracking-tight overflow-hidden text-ellipsis">
                  {number}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-x-8 gap-y-4">
                {keypad.map((item) => (
                  <motion.button
                    key={item.num}
                    whileTap={{ scale: 0.9, backgroundColor: 'rgba(0,0,0,0.1)' }}
                    onClick={() => handleKeyPress(item.num)}
                    className="w-[75px] h-[75px] rounded-full bg-gray-100 flex flex-col items-center justify-center transition-colors"
                  >
                    <span className="text-3xl text-black">{item.num}</span>
                    <span className="text-[10px] text-gray-500 font-bold">{item.letters}</span>
                  </motion.button>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-12">
                 <div className="w-[75px]" /> {/* Spacer */}
                 <motion.button
                   whileTap={{ scale: 0.9 }}
                   className="w-[75px] h-[75px] rounded-full bg-green-500 flex items-center justify-center shadow-lg"
                 >
                   <Phone fill="white" size={32} className="text-white" />
                 </motion.button>
                 <motion.button
                   whileTap={{ scale: 0.8 }}
                   onClick={deleteLast}
                   className={`w-[75px] h-[75px] flex items-center justify-center transition-opacity ${number ? 'opacity-100' : 'opacity-0'}`}
                 >
                   <Delete size={28} className="text-gray-400" />
                 </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="contacts"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-full px-6 overflow-y-auto"
            >
               {['Mama', 'Tata', 'Zencoder', 'John Doe', 'Alice', 'Bob'].sort().map((contact, i) => (
                 <div key={i} className="py-3 border-b border-gray-100 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                      <UserCircle size={24} />
                    </div>
                    <span className="text-lg text-black font-medium">{contact}</span>
                 </div>
               ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tabs */}
      <div className="h-20 border-t border-gray-100 flex items-center justify-around px-4 pb-4">
        {[
          { id: 'favorites', icon: <Star size={22} /> },
          { id: 'recents', icon: <Clock size={22} /> },
          { id: 'contacts', icon: <UserCircle size={22} /> },
          { id: 'keypad', icon: <Grid size={22} /> },
          { id: 'voicemail', icon: <Voicemail size={22} /> }
        ].map((tab) => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 ${activeTab === tab.id ? 'text-blue-500' : 'text-gray-400'}`}
          >
            <span className="transition-transform active:scale-90">
              {tab.icon}
            </span>
            <span className="text-[10px] capitalize font-medium">{tab.id}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PhoneApp;
