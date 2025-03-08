import React, { useState } from 'react';

const BottomToolbar: React.FC = () => {
  const [playerNumber, setPlayerNumber] = useState('');

  const handlePlayerNumberChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPlayerNumber(e.target.value);
    // Optionally, add a callback or context update to trigger filter update
  };

  // Define options including "Any" for the empty value
  const playerOptions = ['Any', '1', '2', '3', '4', '5', '6', '7', '8'];

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gray-50 border-t border-gray-200 p-4">
      <div className="flex justify-end items-center">
        <label className="mr-2 font-bold" htmlFor="playerFilter">
          Players:
        </label>
        <select
          id="playerFilter"
          value={playerNumber}
          onChange={handlePlayerNumberChange}
          className="p-2 border border-gray-300 rounded"
        >
          {playerOptions.map((option, index) => (
           <option key={index} value={option === 'Any' ? '' : option}>
             {option}
           </option>
          ))}
        </select>
      </div>
    </footer>
  );
};

export default BottomToolbar;
