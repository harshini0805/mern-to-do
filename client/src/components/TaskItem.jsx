import React from 'react';

function TaskItem({ todo, onToggle, onDelete }) {
  return (
    <li className={`task-item${todo.completed ? ' task-item--done' : ''}`}>
      <label>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo)}
        />
        <span>{todo.task}</span>
      </label>
      <button
        type="button"
        className="task-item__delete"
        onClick={() => onDelete(todo._id)}
        aria-label={`Delete ${todo.task}`}
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;
