import React from 'react';
import { useNavigate } from 'react-router-dom';

const TaskCard = ({ issue }) => {
  const navigate = useNavigate();

  return (
    <div className="task-card" onClick={() => navigate(`/tasks/${issue.id}`)}>
      {issue.name}
    </div>
  );
};

export default TaskCard;