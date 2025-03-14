import React from 'react';
import AppRouter from './AppRouter';
import { ColyseusProvider } from './contexts/ColyseusContext';
import { Toaster } from 'sonner';

const App: React.FC = () => {
  return (
    <ColyseusProvider>
        <AppRouter />
        <Toaster />
    </ColyseusProvider>
  );
};

export default App;
