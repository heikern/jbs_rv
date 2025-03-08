import React from 'react';
import AppRouter from './AppRouter';

const App: React.FC = () => {
  return (
    <div className="min-h-screen pb-16 bg-black">
      <main>
        <AppRouter />
      </main>
    </div>
  );
};

export default App;
