import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const ClockApp = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full bg-black text-white p-4 pt-14">
        <h1 className="text-3xl font-bold mb-4">World Clock</h1>
        <div className="space-y-0 divide-y divide-gray-800 border-t border-b border-gray-800">
            <div className="flex justify-between items-center py-4">
                <div>
                    <div className="text-gray-400 text-sm">Today, +0HRS</div>
                    <div className="text-2xl font-light">Cupertino</div>
                </div>
                <div className="text-5xl font-thin">{format(time, 'HH:mm')}</div>
            </div>
             <div className="flex justify-between items-center py-4">
                <div>
                    <div className="text-gray-400 text-sm">Today, +6HRS</div>
                    <div className="text-2xl font-light">Warsaw</div>
                </div>
                <div className="text-5xl font-thin">{format(new Date(time.getTime() + 6 * 60 * 60 * 1000), 'HH:mm')}</div>
            </div>
             <div className="flex justify-between items-center py-4">
                <div>
                    <div className="text-gray-400 text-sm">Yesterday, -9HRS</div>
                    <div className="text-2xl font-light">Tokyo</div>
                </div>
                <div className="text-5xl font-thin">{format(new Date(time.getTime() - 9 * 60 * 60 * 1000), 'HH:mm')}</div>
            </div>
        </div>
    </div>
  );
};

export default ClockApp;
