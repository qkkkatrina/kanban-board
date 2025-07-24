import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBoard } from '../components/Board'; // Импортируем контекст

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getTaskById, updateTaskDescription } = useBoard(); // Используем хуки контекста

  const [task, setTask] = useState(null);
  const [description, setDescription] = useState('');

  // Загрузка данных задачи при монтировании или изменении ID
  useEffect(() => {
    const foundTask = getTaskById(id);
    if (foundTask) {
      setTask(foundTask);
      setDescription(foundTask.description || 'This task has no description');
    } else {
      // Если задача не найдена, перенаправляем на главную страницу
      navigate('/');
    }
  }, [id, getTaskById, navigate]); // Добавил getTaskById и navigate в зависимости

  // Сохранение изменений в описании задачи
  const handleSaveDescription = () => {
    if (task) {
      updateTaskDescription(task.id, description);
      navigate('/'); // Возвращаемся на главную после сохранения
    }
  };

  if (!task) {
    return null; // Или можно отобразить лоадер, если нужно
  }

  return (
    <div className="task-details-page">
      <div className="task-details-modal">
        <button className="task-details-modal__close-btn" onClick={() => navigate('/')}>×</button>
        <h2 className="task-details-modal__title">{task.name}</h2>
        <textarea
          className="task-details-modal__description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="This task has no description"
        />
        <button className="task-details-modal__save-btn" onClick={handleSaveDescription}>
          Save
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;