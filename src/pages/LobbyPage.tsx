import TopBar from '@/components/TopBar';
import React from 'react';

const LobbyPage: React.FC = () => {
  return (
    <div>
      <TopBar />
      <h1>Game Lobby</h1>
      <p>Create or join a lobby and wait for other players.</p>
      {/* Add lobby creation/joining UI here */}
    </div>
  );
};

export default LobbyPage;