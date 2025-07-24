import React, { useEffect, useState } from 'react';
import { useBoard } from './Board'; // Импортируем контекст

const Footer = () => {
  const { columns } = useBoard(); // Получаем текущее состояние колонок из контекста
  const [activeTasksCount, setActiveTasksCount] = useState(0);
  const [finishedTasksCount, setFinishedTasksCount] = useState(0);

  // Обновляем счетчики при каждом изменении 'columns'
  useEffect(() => {
    const backlogColumn = columns.find(col => col.title === 'backlog');
    const finishedColumn = columns.find(col => col.title === 'finished');

    // Убедимся, что колонки найдены, прежде чем пытаться получить их длину
    setActiveTasksCount(backlogColumn ? backlogColumn.issues.length : 0);
    setFinishedTasksCount(finishedColumn ? finishedColumn.issues.length : 0);
  }, [columns]); // Зависимость от columns, чтобы пересчитывать при каждом их изменении

  return (
    <footer className="footer">
      <div className="footer__info">
        Active tasks: {activeTasksCount}
      </div>
      <div className="footer__info">
        Finished tasks: {finishedTasksCount}
      </div>
      <div className="footer__author">
        Kanban board by Admin, 2025 {/* Имя изменено на "Admin" */}
      </div>
    </footer>
  );
};

export default Footer;