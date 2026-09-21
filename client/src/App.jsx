import React, { Component } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm.jsx';
import TaskList from './components/TaskList.jsx';

const API_URL = '/api/todos';

class App extends Component {
  // Step 2: initialise state
  state = {
    todos: [],      // array of tasks
    newTodo: '',    // text of the new task
    loading: true,
    error: '',
  };

  // Step 3 & 4: fetch existing tasks once the component is mounted
  componentDidMount() {
    axios
      .get(API_URL)
      .then((res) => this.setState({ todos: res.data, loading: false }))
      .catch(() =>
        this.setState({
          loading: false,
          error: 'Could not load tasks. Is the server running?',
        })
      );
  }

  // Step 5 & 6: keep newTodo in sync with the input box
  handleInputChange = (e) => {
    this.setState({ newTodo: e.target.value });
  };

  // Step 5, 7-10: add a task
  handleSubmit = (e) => {
    e.preventDefault();

    const text = this.state.newTodo.trim();
    if (!text) return; // Step 7: ignore empty input

    // Step 8: build the task object
    const newTask = { task: text, completed: false };

    // Step 9: POST it to the server
    axios
      .post(API_URL, newTask)
      .then((res) =>
        // Step 10: add the saved task (with its MongoDB _id) and clear the input
        this.setState((prev) => ({
          todos: [...prev.todos, res.data],
          newTodo: '',
          error: '',
        }))
      )
      .catch(() => this.setState({ error: 'Could not add the task.' }));
  };

  // Update: toggle completed
  handleToggle = (todo) => {
    axios
      .put(`${API_URL}/${todo._id}`, { completed: !todo.completed })
      .then((res) =>
        this.setState((prev) => ({
          todos: prev.todos.map((t) => (t._id === todo._id ? res.data : t)),
        }))
      )
      .catch(() => this.setState({ error: 'Could not update the task.' }));
  };

  // Delete
  handleDelete = (id) => {
    axios
      .delete(`${API_URL}/${id}`)
      .then(() =>
        this.setState((prev) => ({
          todos: prev.todos.filter((t) => t._id !== id),
        }))
      )
      .catch(() => this.setState({ error: 'Could not delete the task.' }));
  };

  // Step 11: render the UI
  render() {
    const { todos, newTodo, loading, error } = this.state;
    const remaining = todos.filter((t) => !t.completed).length;

    return (
      <main className="app">
        <header className="app__header">
          <h1>Tasks</h1>
          <p className="app__count">
            {todos.length === 0 ? 'Nothing yet' : `${remaining} of ${todos.length} left`}
          </p>
        </header>

        <TaskForm
          value={newTodo}
          onChange={this.handleInputChange}
          onSubmit={this.handleSubmit}
        />

        {error && <p className="app__error" role="alert">{error}</p>}

        {loading ? (
          <p className="app__empty">Loading…</p>
        ) : (
          <TaskList
            todos={todos}
            onToggle={this.handleToggle}
            onDelete={this.handleDelete}
          />
        )}
      </main>
    );
  }
}

export default App;
