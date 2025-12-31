import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaRegFolder, FaChevronRight } from 'react-icons/fa';

const NotesApp = ({ onClose }) => {
  const [notes] = useState([
    { id: 1, title: 'Ideas for iOS 26', content: 'Liquid glass, futuristic lock screen, refined animations...', date: '10:30 AM' },
    { id: 2, title: 'Shopping List', content: 'Milk, Eggs, Bread, Coffee beans', date: 'Yesterday' },
    { id: 3, title: 'Meeting Notes', content: 'Discuss Q4 roadmap, allocate budget for marketing...', date: 'Tuesday' },
    { id: 4, title: 'Code Snippets', content: 'React.useEffect(() => { ... }, []);', date: 'Monday' },
  ]);

  return (
    <div className="w-full h-full bg-[#f2f2f7] flex flex-col overflow-hidden">
       {/* Header */}
       <div className="pt-14 px-4 pb-4 flex justify-between items-end bg-[#f2f2f7]/80 backdrop-blur-md sticky top-0 z-10">
          <h1 className="text-3xl font-bold text-black">Folders</h1>
          <div className="text-yellow-500 text-lg">Edit</div>
       </div>

       {/* Search */}
       <div className="px-4 mb-4">
           <div className="bg-[#e3e3e8] rounded-xl py-2 px-4 flex items-center text-gray-500 gap-2">
               <FaSearch className="text-sm" />
               <span className="text-base">Search</span>
           </div>
       </div>

       {/* Content */}
       <div className="flex-1 overflow-y-auto px-4 space-y-6">
           {/* iCloud Section */}
           <div>
               <div className="bg-white rounded-xl overflow-hidden">
                   <div className="flex items-center p-3 border-b border-gray-100 active:bg-gray-50 cursor-pointer">
                       <FaRegFolder className="text-yellow-500 text-xl mr-3" />
                       <div className="flex-1 flex justify-between items-center">
                           <span className="text-[17px] font-normal">All iCloud</span>
                           <div className="flex items-center gap-2 text-gray-400">
                               <span>{notes.length}</span>
                               <FaChevronRight className="text-xs" />
                           </div>
                       </div>
                   </div>
                   <div className="flex items-center p-3 border-b border-gray-100 active:bg-gray-50 cursor-pointer">
                       <FaRegFolder className="text-yellow-500 text-xl mr-3" />
                       <div className="flex-1 flex justify-between items-center">
                           <span className="text-[17px] font-normal">Notes</span>
                           <div className="flex items-center gap-2 text-gray-400">
                               <span>3</span>
                               <FaChevronRight className="text-xs" />
                           </div>
                       </div>
                   </div>
                   <div className="flex items-center p-3 active:bg-gray-50 cursor-pointer">
                       <FaRegFolder className="text-yellow-500 text-xl mr-3" />
                       <div className="flex-1 flex justify-between items-center">
                           <span className="text-[17px] font-normal">Recently Deleted</span>
                           <div className="flex items-center gap-2 text-gray-400">
                               <span>0</span>
                               <FaChevronRight className="text-xs" />
                           </div>
                       </div>
                   </div>
               </div>
           </div>

           {/* Recent Notes Preview */}
           <div>
               <h2 className="text-xs font-semibold text-gray-500 uppercase mb-2 pl-3">Recent Notes</h2>
               <div className="bg-white rounded-xl overflow-hidden">
                   {notes.map((note, index) => (
                       <div key={note.id} className="p-3 border-b border-gray-100 last:border-none active:bg-gray-50 cursor-pointer">
                           <h3 className="text-[17px] font-bold text-black mb-0.5">{note.title}</h3>
                           <div className="flex items-center text-sm text-gray-500 gap-2">
                               <span>{note.date}</span>
                               <span className="truncate">{note.content}</span>
                           </div>
                       </div>
                   ))}
               </div>
           </div>
       </div>

       {/* Bottom Bar */}
       <div className="bg-[#f2f2f7]/90 backdrop-blur-md border-t border-gray-300/50 p-3 px-4 flex justify-between items-center text-yellow-500 text-xl">
           <FaRegFolder />
           <FaEdit />
       </div>
       <div className="h-2 w-full bg-transparent" />
    </div>
  );
};

// Simple search icon component for local use
const FaSearch = ({ className }) => (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" className={className} height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
        <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
    </svg>
);

export default NotesApp;
