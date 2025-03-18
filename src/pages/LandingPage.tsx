import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate('/create-game');
  };

  const handleJoin = () => {
    navigate('/join-room');
  };

  const handleBrowse = () => {
    navigate('/script-browse');
  };

  return (
    <div className="min-h-screen w-screen bg-black text-white flex flex-col justify-center items-center">
      <h1 className="text-3xl mb-2">Welcome to Jubensha</h1>
      <div className="flex flex-col items-center space-y-4">
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleCreate}>Create Game</Button>
          <Button variant="outline" onClick={handleJoin}>Join Game</Button>
        </div>
        <div>
          <Button variant="outline" onClick={handleBrowse}>Browse Adventures</Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
