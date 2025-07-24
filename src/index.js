import React from 'react';
import ReactDOM from 'react-dom/client'; 
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root')); // Здесь ищем div#root
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/kanban-board">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);