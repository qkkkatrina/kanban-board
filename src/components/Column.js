import React, { useState, useRef, useEffect, useCallback } from 'react'; // Добавили useCallback
import TaskCard from './TaskCard';
import { v4 as uuidv4 } from 'uuid';
import { useBoard } from './Board'; // Импортируем контекст

const Column = ({ title, issues, columnIndex }) => {
  const { updateColumn, getPrevColumnIssues, getPrevColumnTitle } = useBoard();

  const [isAdding, setIsAdding] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const prevColumnIssues = getPrevColumnIssues(columnIndex);
  const prevColumnTitle = getPrevColumnTitle(columnIndex);

  const isAddDisabled = title !== 'backlog' && prevColumnIssues.length === 0;

  // Оборачиваем handleSubmitNewTask в useCallback
  const handleSubmitNewTask = useCallback(() => {
    if (inputValue.trim()) {
      const newTask = { id: uuidv4(), name: inputValue.trim(), description: 'This task has no description.' };
      updateColumn(title, [...issues, newTask]);
      setInputValue('');
      setIsAdding(false);
    } else {
      setIsAdding(false); // Закрываем поле, если ввод пустой
    }
  }, [inputValue, issues, title, updateColumn]); // Зависимости для useCallback

  // Обработчик для открытия поля ввода или дропдауна
  const handleAddClick = () => {
    if (isAddDisabled) return;

    if (title === 'backlog') {
      setIsAdding(true);
      setDropdownVisible(false);
    } else {
      setDropdownVisible(prev => !prev);
      setIsAdding(false);
    }
  };

  // Обработчик выбора задачи из дропдауна (перемещение задачи)
  const handleSelectTaskFromPrev = (task) => {
    updateColumn(title, [...issues, task]);

    if (prevColumnTitle) {
      const updatedPrevIssues = prevColumnIssues.filter(i => i.id !== task.id);
      updateColumn(prevColumnTitle, updatedPrevIssues);
    }
    
    setDropdownVisible(false);
  };

  // Эффект для автоматического фокуса на инпуте
  useEffect(() => {
    if (isAdding && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAdding]);

  // Эффект для закрытия дропдауна/инпута при клике вне
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedOnButton = event.target.closest('.add-card-btn');
      const clickedInsideDropdown = dropdownRef.current && dropdownRef.current.contains(event.target);
      const clickedInsideInput = inputRef.current && inputRef.current.contains(event.target);

      if (isAdding && !clickedInsideInput && !clickedOnButton) {
        handleSubmitNewTask(); // Теперь handleSubmitNewTask стабильна
      }
      if (dropdownVisible && !clickedInsideDropdown && !clickedOnButton) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isAdding, dropdownVisible, handleSubmitNewTask]); // handleSubmitNewTask теперь безопасно в зависимостях

  return (
    <div className="column">
      <h2 className="column__title">{title.toUpperCase()}</h2>
      <div className="column__tasks">
        {issues.map(issue => (
          <TaskCard key={issue.id} issue={issue} />
        ))}
      </div>

      {isAdding && title === 'backlog' && (
        <input
          ref={inputRef}
          className="column__input-new-task"
          type="text"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onBlur={handleSubmitNewTask}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmitNewTask();
            }
          }}
          placeholder="Enter task name"
        />
      )}

      {dropdownVisible && title !== 'backlog' && (
        <ul className="column__dropdown" ref={dropdownRef}>
          {prevColumnIssues.length > 0 ? (
            prevColumnIssues.map(task => (
              <li key={task.id} className="column__dropdown-item" onClick={() => handleSelectTaskFromPrev(task)}>
                {task.name}
              </li>
            ))
          ) : (
            <li className="column__dropdown-item" style={{ cursor: 'default', fontStyle: 'italic', color: '#888' }}>No tasks to move</li>
          )}
        </ul>
      )}

      <button
        onClick={isAdding && title === 'backlog' ? handleSubmitNewTask : handleAddClick}
        disabled={isAddDisabled}
        className={`add-card-btn ${isAddDisabled ? 'disabled' : ''}`}
      >
        {isAdding && title === 'backlog' ? 'Submit' : '+ Add card'}
      </button>
    </div>
  );
};

export default Column;