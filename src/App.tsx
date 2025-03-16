import React from 'react';
import AppRouter from './AppRouter';
import { Toaster } from 'sonner';

const App: React.FC = () => {
  return (
    <div>
        <AppRouter />
        <Toaster />
    </div>
  );
};

export default App;
