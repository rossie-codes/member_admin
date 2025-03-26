import React, { useState } from 'react';

interface NumPadProps {
  onInput: (value: string) => void;
  onLogin: () => void;
}

const NumPad: React.FC<NumPadProps> = ({ onInput, onLogin }) => {
  const [input, setInput] = useState('');

  const handleButtonClick = (value: string) => {
    if (input.length < 6) {
      const newInput = input + value;
      setInput(newInput);
      onInput(newInput);
    }
  };

  const handleClear = () => {
    setInput('');
    onInput('');
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-[5px_10px_40px_rgba(0,0,0,0.15)] w-64">
        <div className="mb-4 flex justify-center items-center h-12 bg-gray-100 text-3xl tracking-widest rounded-md border border-gray-300">
          {input.split('').map(() => '•').join('') || ''}
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handleButtonClick(num)}
              className="text-xl font-semibold text-gray-700 py-2 rounded-md hover:bg-gray-200"
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleClear}
            className="text-sm font-medium text-gray-500 py-2 rounded-md hover:bg-gray-200"
          >
            clear
          </button>
          <button
            onClick={() => handleButtonClick('0')}
            className="text-xl font-semibold text-gray-700 py-2 rounded-md hover:bg-gray-200"
          >
            0
          </button>
          <button
            onClick={onLogin}
            className="text-sm font-medium text-blue-600 py-2 rounded-md hover:bg-blue-100"
          >
            enter
          </button>
        </div>
      </div>
    </div>
  );
};

export default NumPad;