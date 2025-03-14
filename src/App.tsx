import React from 'react';
import AppRouter from './AppRouter';
import { RoomProvider } from './contexts/RoomContext';
import { Toaster } from 'sonner';

const App: React.FC = () => {
  return (
    <RoomProvider>
        <AppRouter />
        <Toaster />
    </RoomProvider>
  );
};

export default App;
