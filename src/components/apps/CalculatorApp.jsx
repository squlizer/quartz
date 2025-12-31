import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CalculatorApp = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const calculate = (first, second, op) => {
    const f = parseFloat(first);
    const s = parseFloat(second);
    if (op === '+') return f + s;
    if (op === '-') return f - s;
    if (op === '×') return f * s;
    if (op === '÷') return f / s;
    return s;
  };

  const handleNumber = (num) => {
    if (waitingForOperand) {
      setDisplay(String(num));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operator) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operator);
      setPreviousValue(newValue);
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const handleAction = (action) => {
    if (action === 'AC') {
      setDisplay('0');
      setPreviousValue(null);
      setOperator(null);
      setWaitingForOperand(false);
    } else if (action === '±') {
      setDisplay(String(parseFloat(display) * -1));
    } else if (action === '%') {
      setDisplay(String(parseFloat(display) / 100));
    } else if (action === '=') {
      if (operator && previousValue !== null) {
        const result = calculate(previousValue, display, operator);
        setDisplay(String(result));
        setPreviousValue(null);
        setOperator(null);
        setWaitingForOperand(false);
      }
    } else if (action === '.') {
      if (!display.includes('.')) {
        setDisplay(display + '.');
      }
    }
  };

  const buttons = [
    { label: display === '0' && !previousValue ? 'AC' : 'C', type: 'action', color: 'bg-[#A5A5A5] text-black' },
    { label: '±', type: 'action', color: 'bg-[#A5A5A5] text-black' },
    { label: '%', type: 'action', color: 'bg-[#A5A5A5] text-black' },
    { label: '÷', type: 'operator', color: 'bg-[#FF9F0A] text-white' },
    { label: '7', type: 'number', color: 'bg-[#333333] text-white' },
    { label: '8', type: 'number', color: 'bg-[#333333] text-white' },
    { label: '9', type: 'number', color: 'bg-[#333333] text-white' },
    { label: '×', type: 'operator', color: 'bg-[#FF9F0A] text-white' },
    { label: '4', type: 'number', color: 'bg-[#333333] text-white' },
    { label: '5', type: 'number', color: 'bg-[#333333] text-white' },
    { label: '6', type: 'number', color: 'bg-[#333333] text-white' },
    { label: '-', type: 'operator', color: 'bg-[#FF9F0A] text-white' },
    { label: '1', type: 'number', color: 'bg-[#333333] text-white' },
    { label: '2', type: 'number', color: 'bg-[#333333] text-white' },
    { label: '3', type: 'number', color: 'bg-[#333333] text-white' },
    { label: '+', type: 'operator', color: 'bg-[#FF9F0A] text-white' },
    { label: '0', type: 'number', color: 'bg-[#333333] text-white', wide: true },
    { label: '.', type: 'action', color: 'bg-[#333333] text-white' },
    { label: '=', type: 'action', color: 'bg-[#FF9F0A] text-white' },
  ];

  return (
    <div className="w-full h-full bg-black flex flex-col justify-end p-5 pb-10">
      <div className="flex-1 flex items-end justify-end px-4 mb-6">
        <motion.span 
          key={display}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-white text-7xl font-light tracking-tight overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {display}
        </motion.span>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {buttons.map((btn, i) => (
          <motion.button
            key={i}
            whileTap={{ brightness: 1.5, scale: 0.95 }}
            onClick={() => {
              if (btn.type === 'number') handleNumber(btn.label);
              else if (btn.type === 'operator') handleOperator(btn.label);
              else handleAction(btn.label);
            }}
            className={`
              ${btn.wide ? 'col-span-2 text-left px-8' : 'aspect-square'}
              rounded-full text-3xl font-medium transition-colors flex items-center justify-center
              ${btn.color}
              ${operator === btn.label && waitingForOperand ? 'bg-white text-[#FF9F0A]' : ''}
            `}
          >
            {btn.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default CalculatorApp;
