const express = require('express');
const router = express.Router();
const tasks = require('../Controllers/task.controller.js');

// Task Manipulation =========================================================

// Active Tasks Page
router.get('/activeTasks/:name', tasks.findActive);

// Completed Tasks Page
router.get('/completeTasks/:name', tasks.findComplete);

// OverDue Tasks Page
router.get('/overDueTasks/:name', tasks.findOverDue);

// Deadline Tasks Page
router.get('/deadlineTasks/:name/:dueDate', tasks.findDeadline);

// Create a new Task
router.post('/addtask', tasks.create);

// Delete Task by database document ID
router.delete('/:taskId', tasks.delete);

// Update a Task with by database document ID
router.put('/:taskId', tasks.update);

// Retrieve a single Task by database document ID
router.get('/:taskId', tasks.findOne);

module.exports = router;
