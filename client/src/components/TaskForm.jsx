import React from 'react';

function TaskForm({ value, onChange, onSubmit }) {
  return (
    <form className="task-form" onSubmit={onSubmit}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="What needs doing?"
        aria-label="New task"
        maxLength={200}
      />
      <button type="submit">Add task</button>
    </form>
  );
}

export default TaskForm;
