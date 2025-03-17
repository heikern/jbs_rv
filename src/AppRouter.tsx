import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CreateGamePage from './pages/CreateGamePage';
import ScriptBrowsePage from './pages/ScriptBrowsePage';
import JoinGamePage from './pages/JoinGamePage';
import LobbyPage from './pages/LobbyPage';
import GamePage from './pages/GamePage';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/create-game" element={<CreateGamePage />} />
      <Route path="/join-game" element={<JoinGamePage />} />
      <Route path="/script-browse" element={<ScriptBrowsePage />} />
      <Route path="/lobby" element={<LobbyPage />} />
      <Route path="/game" element={<GamePage />} />
    </Routes>
  );
};

export default AppRouter;