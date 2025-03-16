import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import { store } from './store'; // Updated to use named export
import { RoomProvider } from './contexts/RoomContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RoomProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </RoomProvider>
    </Provider>
  </React.StrictMode>,
);
