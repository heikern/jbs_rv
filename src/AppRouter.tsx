import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ScriptBrowsePage from './pages/ScriptBrowsePage';
import LobbyPage from './pages/LobbyPage';
import GamePage from './pages/GamePage';

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/script-browse" element={<ScriptBrowsePage />} />
      <Route path="/lobby" element={<LobbyPage />} />
      <Route path="/game" element={<GamePage />} />
    </Routes>
  );
};

export default AppRouter;