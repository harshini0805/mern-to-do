import React from 'react';
import TaskItem from './TaskItem.jsx';

function TaskList({ todos, onToggle, onDelete }) {
  if (todos.length === 0) {
    return <p className="app__empty">No tasks yet. Add your first one above.</p>;
  }

  // Step 12: map through the todos array
  return (
    <ul className="task-list">
      {todos.map((todo) => (
        <TaskItem
          key={todo._id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TaskList;
