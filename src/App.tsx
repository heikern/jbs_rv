import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './AppRouter';
import { ColyseusProvider } from './contexts/ColyseusContext';

const App: React.FC = () => {
  return (
    <ColyseusProvider>
      <Router>
        <AppRouter />
      </Router>
    </ColyseusProvider>
  );
};

export default App;
