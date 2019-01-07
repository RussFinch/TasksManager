const Task = require('../Models/task.model.js');

exports.create = (req, res) => {
  // Create and save new task.
  if (!req.body.newTask.taskName) {
    res.send(JSON.stringify({
      message: 'Task Title cannot be empty..',
    }));
  } else {
    const task = new Task({
      taskName: req.body.newTask.taskName,
      description: req.body.newTask.description || 'No Description provided',
      dueDate: req.body.newTask.dueDate,
      completed: req.body.newTask.completed || 'false',
      completionDate: req.body.newTask.completionDate,
      createdBy: req.body.newTask.createdBy,
    });
    task.save((err, data) => {
      if (err) {
        res.status(500).send(JSON.stringify(err));
      } else {
        res.send({
          message: data,
        });
      }
    });
  }
};

// Find all tasks assigned to logged in user.
exports.findAll = (req, res) => {
  const userName = req.params.name;
  Task.find({
    createdBy: userName,
  }, (err, data) => {
    if (err) {
      res.status(500).send(JSON.stringify(err));
    } else {
      res.send(JSON.stringify(data));
    }
  });
};

// Find all Active tasks assigned to logged in user.
exports.findActive = (req, res) => {
  const userName = req.params.name;
  Task.find({
    createdBy: userName,
    completed: false,
  }, (err, data) => {
    if (err) {
      res.status(500).send(JSON.stringify(err));
    } else {
      res.send(JSON.stringify(data));
    }
  });
};

// Find all Completed tasks assigned to logged in user.
exports.findComplete = (req, res) => {
  const userName = req.params.name;
  Task.find({
    createdBy: userName,
    completed: true,
  }, (err, data) => {
    if (err) {
      res.status(500).send(JSON.stringify(err));
    } else {
      res.send(JSON.stringify(data));
    }
  });
};

// Find all Overdue tasks assigned to logged in user.
exports.findOverDue = (req, res) => {
  const userName = req.params.name;
  Task.find({
    createdBy: userName,
    completed: false,
    dueDate: {
      $lte: new Date(),
    },
  }, (err, data) => {
    if (err) {
      res.status(500).send(JSON.stringify(err));
    } else {
      res.send(JSON.stringify(data));
    }
  });
};

// Find all Overdue tasks assigned to logged in user.
exports.findDeadline = (req, res) => {
  const userName = req.params.name;
  const deadline = req.params.dueDate;
  Task.find({
    createdBy: userName,
    completed: false,
    dueDate: {
      $lte: deadline,
    },
  }, (err, data) => {
    if (err) {
      res.status(500).send(JSON.stringify(err));
    } else {
      res.send(JSON.stringify(data));
    }
  });
};

exports.delete = (req, res) => {
  // delete a task with ID.
  const docId = req.params.taskId;
  Task.findByIdAndRemove(docId, (err, task) => {
    if (err) {
      res.status(500).send({
        message: 'Some error occurred while'
        + 'deleting Task.',
      });
    } else {
      res.send({
        message: `The following Task has been deleted.\n\n, ${task}`,
      });
    }
  });
};

exports.update = (req, res) => {
  // Update a single task with ID.
  const docId = req.params.taskId;
  Task.findByIdAndUpdate(docId, {
    $set: {
      taskName: req.body.updateTask.taskName,
      description: req.body.updateTask.description,
      dueDate: req.body.updateTask.dueDate,
      completed: req.body.updateTask.completed,
      completionDate: req.body.updateTask.completionDate,
      createdBy: req.body.updateTask.createdBy,
    },
  }, (err, task) => {
    if (err) {
      res.status(500).send({
        message: 'An error occurred while'
        + 'updating Task.',
      });
    } else {
      res.send(`This task was updated.\n\n', ${task}`);
    }
  });
};

// retrieve a single task with ID.
exports.findOne = (req, res) => {
  const docId = req.params.taskId;
  Task.findById(docId, (err, task) => {
    if (err) {
      res.status(500).send({
        message: 'Some error occurred while'
        + 'retrieving Task.',
      });
    } else {
      res.send(task);
    }
  });
};
