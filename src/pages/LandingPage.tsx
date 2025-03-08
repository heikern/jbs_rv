import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate('/script-browse');
  };

  const handleJoin = () => {
    navigate('/lobby');
  };

  return (
    <div className="min-h-screen w-screen bg-black p-4 text-white flex flex-col justify-center items-center">
      <h1 className="text-3xl mb-6">Welcome to Jubensha</h1>
      <div className="space-x-4">
        <button onClick={handleCreate} className="px-4 py-2 bg-blue-500 text-white rounded">
          Create Game
        </button>
        <button onClick={handleJoin} className="px-4 py-2 bg-green-500 text-white rounded">
          Join Game
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
