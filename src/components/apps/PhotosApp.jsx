import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaSearch } from 'react-icons/fa';

const PhotosApp = ({ onClose }) => {
  const photos = [
    'https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1707343844152-6d33a0bb32c3?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1705533352191-893043818625?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1682685797828-d3b255974450?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1682695796954-bad0d0f59ff1?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1682695797221-8164ff1fafc9?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1706463629335-d92264bbfd6f?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1682687982501-1e58ab814714?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1706049379414-437ec3a54e93?q=80&w=1000&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1705884260273-03734062136a?q=80&w=1000&auto=format&fit=crop',
  ];

  return (
    <div className="w-full h-full bg-white flex flex-col overflow-hidden">
       {/* Header */}
       <div className="pt-14 px-4 pb-4 bg-white/80 backdrop-blur-md sticky top-0 z-10 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-black">Photos</h1>
          <FaSearch className="text-black text-lg" />
       </div>

       {/* Tabs */}
       <div className="px-4 mb-4">
          <div className="bg-gray-100 p-1 rounded-xl flex">
              <div className="flex-1 py-1.5 bg-white shadow-sm rounded-lg text-center text-xs font-semibold text-black">Library</div>
              <div className="flex-1 py-1.5 text-center text-xs font-medium text-gray-500">For You</div>
              <div className="flex-1 py-1.5 text-center text-xs font-medium text-gray-500">Albums</div>
              <div className="flex-1 py-1.5 text-center text-xs font-medium text-gray-500">Search</div>
          </div>
       </div>

       {/* Grid */}
       <div className="flex-1 overflow-y-auto px-1">
          <div className="grid grid-cols-3 gap-1 pb-8">
              {photos.map((url, index) => (
                  <div key={index} className="aspect-square relative bg-gray-200 overflow-hidden">
                      <img 
                        src={url} 
                        alt={`Photo ${index}`} 
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      {index % 5 === 0 && (
                          <div className="absolute top-1 right-1 text-white drop-shadow-md">
                              <FaHeart className="text-xs" />
                          </div>
                      )}
                  </div>
              ))}
          </div>
          
          <div className="px-4 mt-4 mb-8">
            <h2 className="text-xl font-bold mb-2">Memories</h2>
            <div className="w-full h-48 bg-black rounded-xl overflow-hidden relative">
                 <img src={photos[0]} className="w-full h-full object-cover opacity-80" />
                 <div className="absolute bottom-4 left-4 text-white">
                     <p className="text-xs uppercase font-medium tracking-wider">On this day</p>
                     <p className="text-2xl font-bold">2 Years Ago</p>
                 </div>
            </div>
          </div>
       </div>
    </div>
  );
};

export default PhotosApp;
