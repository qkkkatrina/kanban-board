import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Board from './components/Board';
// import TaskDetails from './pages/TaskDetails'; // TaskDetails теперь не нужен здесь, он будет внутри Board

import Header from './components/Header';
// import Footer from './components/Footer'; // Footer тоже убираем, он будет внутри Board

const App = () => (
  <div className="app">
    <Header />
    <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Routes>
        {/* Board будет рендериться на главной странице */}
        <Route path="/" element={<Board />} />
        {/* TaskDetails будет открываться как вложенный маршрут внутри Board */}
        {/* Это позволит BoardContext быть доступным для TaskDetails */}
        <Route path="/tasks/:id" element={<Board />} />
      </Routes>
    </div>
    {/* Футер больше не здесь, он будет в Board */}
  </div>
);

export default App