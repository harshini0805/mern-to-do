const express = require('express');
const mongoose = require('mongoose');
const Todo = require('../models/Todo');

const router = express.Router();

// Reject malformed ids early instead of letting Mongoose throw a CastError
const validateId = (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid task id' });
  }
  next();
};

// READ  -> GET /api/todos
router.get('/', async (req, res, next) => {
  try {
    const todos = await Todo.find().sort({ createdAt: 1 });
    res.json(todos);
  } catch (err) {
    next(err);
  }
});

// CREATE -> POST /api/todos   body: { task, completed }
router.post('/', async (req, res, next) => {
  try {
    const { task, completed } = req.body;
    const todo = await Todo.create({ task, completed });
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
});

// UPDATE -> PUT /api/todos/:id   body: { task?, completed? }
router.put('/:id', validateId, async (req, res, next) => {
  try {
    const updates = {};
    if (req.body.task !== undefined) updates.task = req.body.task;
    if (req.body.completed !== undefined) updates.completed = req.body.completed;

    const todo = await Todo.findByIdAndUpdate(req.params.id, updates, {
      new: true, // return the updated document
      runValidators: true,
    });
    if (!todo) return res.status(404).json({ message: 'Task not found' });
    res.json(todo);
  } catch (err) {
    next(err);
  }
});

// DELETE -> DELETE /api/todos/:id
router.delete('/:id', validateId, async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Task not found' });
    res.json({ message: 'Task deleted', id: todo._id });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
