import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaCalendarAlt } from 'react-icons/fa';
import { format, addDays, startOfWeek, addMonths, subMonths, startOfMonth, endOfMonth, endOfWeek, isSameMonth, isSameDay } from 'date-fns';

const CalendarApp = ({ onClose }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const renderHeader = () => {
    return (
      <div className="flex items-center justify-between px-4 py-4">
        <span className="text-red-500 text-lg cursor-pointer" onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
          Prev
        </span>
        <span className="text-xl font-bold text-black">
          {format(currentMonth, 'MMMM yyyy')}
        </span>
        <span className="text-red-500 text-lg cursor-pointer" onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
          Next
        </span>
      </div>
    );
  };

  const renderDays = () => {
    const dateFormat = "EEEEE";
    const days = [];
    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="flex-1 text-center text-gray-400 font-medium text-xs uppercase" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="flex mb-2">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        
        const isSelected = isSameDay(day, selectedDate);
        const isCurrentMonth = isSameMonth(day, monthStart);

        days.push(
          <div
            className={`flex-1 h-12 flex items-center justify-center relative cursor-pointer`}
            key={day}
            onClick={() => setSelectedDate(cloneDay)}
          >
            <div className={`w-8 h-8 flex items-center justify-center rounded-full text-lg 
              ${isSelected ? 'bg-red-500 text-white' : ''} 
              ${!isCurrentMonth ? 'text-gray-300' : 'text-black'}
              ${isSameDay(day, new Date()) && !isSelected ? 'text-red-500 font-bold' : ''}
            `}>
              {formattedDate}
            </div>
            {/* Dot for events (mock) */}
            {Math.random() > 0.8 && (
                <div className="absolute bottom-1 w-1 h-1 bg-gray-400 rounded-full" />
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="flex" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="flex flex-col">{rows}</div>;
  };

  return (
    <div className="w-full h-full bg-white flex flex-col relative overflow-hidden">
      {/* Header Area */}
      <div className="pt-14 px-4 pb-2 border-b border-gray-100 flex justify-between items-end bg-white/80 backdrop-blur-md sticky top-0 z-10">
         <h1 className="text-3xl font-bold text-black">Calendar</h1>
         <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-red-500">
             <FaPlus />
         </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {renderHeader()}
        <div className="px-2">
            {renderDays()}
            {renderCells()}
        </div>
        
        <div className="mt-6 px-4">
            <h3 className="text-gray-500 font-medium mb-2 uppercase text-xs">Schedule</h3>
            <div className="bg-gray-50 rounded-xl p-4 mb-3 border border-gray-100">
                <div className="flex justify-between mb-1">
                    <span className="font-semibold text-black">Meeting with Team</span>
                    <span className="text-gray-400 text-sm">10:00 AM</span>
                </div>
                <p className="text-gray-500 text-sm">Discussing the iOS 26 project requirements.</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <div className="flex justify-between mb-1">
                    <span className="font-semibold text-black">Lunch Break</span>
                    <span className="text-gray-400 text-sm">1:00 PM</span>
                </div>
                <p className="text-gray-500 text-sm">Pizza time!</p>
            </div>
        </div>
      </div>
      
      <div className="h-6 w-full shrink-0" />
    </div>
  );
};

export default CalendarApp;
