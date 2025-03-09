import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate('/create-game');
  };

  const handleJoin = () => {
    navigate('/lobby');
  };

  const handleBrowse = () => {
    navigate('/script-browse');
  };

  return (
    <div className="min-h-screen w-screen bg-black text-white flex flex-col justify-center items-center">
      <h1 className="text-3xl mb-8">Welcome to Jubensha</h1>
      <div className="space-x-2">
        <button onClick={handleCreate} className="px-3 py-1 text-sm inline-block bg-blue-500 hover:bg-blue-600 rounded">
          Create Game
        </button>
        <button onClick={handleJoin} className="px-3 py-1 text-sm inline-block bg-green-500 hover:bg-green-600 rounded">
          Join Game
        </button>
        <button onClick={handleBrowse} className="px-3 py-1 text-sm inline-block bg-purple-500 hover:bg-purple-600 rounded">
          Browse Games
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
