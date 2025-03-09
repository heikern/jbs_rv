import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // added import
import GameList from '../components/GameList'; // assuming this component exists
import type { Adventure } from '../types/storyTypes';
import type { RootState } from '../store';
import { ColyseusProvider, useColyseus } from '../contexts/ColyseusContext';

function CreateGameContent() {
  const [players, setPlayers] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState('');

  // Move hook call to the top level
  const { joinRoom } = useColyseus();
  const navigate = useNavigate(); // added navigation hook

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(inputValue, 10);
    if (!isNaN(num) && num > 0) {
      setPlayers(num);
    }
  };

  // Use selectedGameId from Redux and retrieve adventures from firebase state
  const selectedGameId = useSelector((state: RootState) => state.game.selectedGameId);
  const { adventures } = useSelector((state: RootState) => state.firebase);
  const selectedStory: Adventure | undefined = selectedGameId
    ? adventures.find((adventure: Adventure) => Number(adventure.id) === selectedGameId)
    : undefined;

  return (
    <div className="min-h-screen w-screen bg-black flex flex-col items-center">
      {/* Fixed back button */}
      <div className="fixed top-0 left-0 w-full p-4 z-10">
        <button
          onClick={() => navigate('/')} // modified navigation
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          Back
        </button>
      </div>
      {players === null ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
            <label htmlFor="players" className="block mb-4 text-black">
              How many players?
            </label>
            <input
              id="players"
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="border p-2 mb-4 w-full"
              min="1"
            />
            <div className="flex space-x-4">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Confirm
              </button>
              <button type="button" onClick={() => navigate('/')} className="bg-gray-500 text-white px-4 py-2 rounded">
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="w-full pt-20 relative h-screen">
          <div className="overflow-y-auto h-[calc(100vh-150px)]">
            {/* Pass a callback to GameList to update the selected story if desired */}
            <GameList filterPlayerNum={players} /* onSelectStory={setSelectedStory} */ />
          </div>
          {/* Fixed create room div */}
          <div className="fixed bottom-0 left-0 w-full p-4 border-t border-gray-300 text-white bg-black z-10">
            {selectedStory ? (
              <>
                <p>Selected Story: {selectedStory.title}</p>
                <button
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={async () => {
                    try {
                      // Use joinRoom from the hook
                      const room = await joinRoom("my_room", { players });
                      console.log("Joined room:", room);
                      navigate('/lobby'); // modified navigation
                    } catch (error) {
                      console.error("Failed to join room:", error);
                    }
                  }}
                >
                  Create Room
                </button>
              </>
            ) : (
              <p>No story selected</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Suggestion: Consider storing the current selected story in Redux if this state is used application-wide.
export default function CreateGamePage() {
  return (
    <ColyseusProvider>
      <CreateGameContent />
    </ColyseusProvider>
  );
}
