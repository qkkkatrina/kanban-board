import React, { useEffect, useState, createContext, useContext } from 'react';
import { useParams } from 'react-router-dom'; // Импортируем useParams
import Column from './Column';
import Footer from './Footer'; // Импортируем Footer сюда
import TaskDetails from '../pages/TaskDetails'; // Импортируем TaskDetails сюда
import { loadFromStorage, saveToStorage } from '../utils/localStorage';
import { mockData } from '../data/mockData';

// Создаем контекст для обмена данными между колонками и обновления состояния
const BoardContext = createContext();

export const useBoard = () => useContext(BoardContext);

const Board = () => {
  const [columns, setColumns] = useState([]);
  const { id } = useParams(); // Получаем ID задачи из URL

  // Загрузка данных при первом рендере или из localStorage
  useEffect(() => {
    const saved = loadFromStorage();
    if (saved && saved.length > 0) {
      setColumns(saved);
    } else {
      setColumns(mockData);
    }
  }, []);

  // Сохранение данных при каждом изменении columns
  useEffect(() => {
    if (columns.length > 0) {
      saveToStorage(columns);
    }
  }, [columns]);

  const updateColumn = (titleToUpdate, newIssues) => {
    setColumns(prevColumns =>
      prevColumns.map(col =>
        col.title === titleToUpdate ? { ...col, issues: newIssues } : col
      )
    );
  };

  const getPrevColumnIssues = (currentIndex) => {
    if (currentIndex > 0) {
      return columns[currentIndex - 1]?.issues || [];
    }
    return [];
  };

  const getPrevColumnTitle = (currentIndex) => {
    if (currentIndex > 0) {
      return columns[currentIndex - 1]?.title || '';
    }
    return '';
  };

  const getTaskById = (taskId) => { // Переименовал параметр для ясности
    for (const column of columns) {
      const task = column.issues.find(issue => issue.id === taskId);
      if (task) {
        return task;
      }
    }
    return null;
  };

  const updateTaskDescription = (taskId, newDescription) => { // Переименовал параметр
    setColumns(prevColumns =>
      prevColumns.map(column => ({
        ...column,
        issues: column.issues.map(issue =>
          issue.id === taskId ? { ...issue, description: newDescription } : issue
        )
      }))
    );
  };

  return (
    <BoardContext.Provider value={{
      columns,
      updateColumn,
      getPrevColumnIssues,
      getPrevColumnTitle,
      getTaskById,
      updateTaskDescription
    }}>
      <main className="board-container">
        {columns.map((col, index) => (
          <Column
            key={col.title}
            title={col.title}
            issues={col.issues}
            columnIndex={index}
          />
        ))}
      </main>
      <Footer /> {/* Футер теперь внутри Board, чтобы иметь доступ к контексту */}
      {id && <TaskDetails />} {/* TaskDetails рендерится, если есть ID в URL (т.е. открыто модальное окно) */}
    </BoardContext.Provider>
  );
};

export default Board;