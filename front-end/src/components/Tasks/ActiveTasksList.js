import React, {
  Component,
} from 'react';
import {
  Redirect,
} from 'react-router-dom';
import {
  Button,
  Checkbox,
} from 'react-bootstrap';
import axios from 'axios';

class ActiveTasksList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      editTask: false,
      taskId: '',
      taskName: '',
      description: '',
      dueDate: '',
      createdBy: '',
      completed: '',
    };
    this.handleEditTask = this.handleEditTask.bind(this);
    this.handleCompletedChange = this.handleCompletedChange.bind(this);
  }

  componentWillReceiveProps(newProp) {
    const {
      profile,
    } = this.props;
    if (profile !== newProp.profile) {
      const user = newProp.profile.name;
      this.collectTasks(user);
    }
  }

  collectTasks(user) {
    axios.get('https://russfincham.com:8443/tasks/activeTasks/' + user)
      .then((res) => {
        const response = res.data;
        this.setState({
          tasks: response,
        });
      });
  }

  handleCompletedChange(taskId, name, description, dueDate, createdBy, completed) {
    const {
      profile,
    } = this.props;
    const updateCompleted = !completed;
    const updateTask = {
      taskName: name,
      description,
      dueDate,
      createdBy,
      completed: updateCompleted,
    };

    axios.put('https://russfincham.com:8443/tasks/' + taskId, {
      updateTask,
    })
      .then(this.collectTasks(profile.name));
  }

  handleEditTask(taskId, name, description, dueDate, createdBy, completed) {
    this.setState({
      taskId,
      description,
      dueDate,
      createdBy,
      completed,
      taskName: name,
      editTask: true,
    });
  }


  render() {
    const {
      editTask,
      taskId,
      taskName,
      description,
      dueDate,
      createdBy,
      completed,
    } = this.state;
    const {
      tasks,
    } = this.state;
    if (editTask) {
      return (
        <Redirect to={
          {
            pathname: '/tasks/editTask',
            taskId,
            taskName,
            description,
            dueDate,
            createdBy,
            completed,
            editTask: 'active',
          }
        }
        />
      );
    }
    return (
      <tbody>
        {
        tasks.map(task => (
          <tr key={task._id}>
            <td align="left">{task.taskName}</td>
            <td align="left">{task.description}</td>
            <td align="left">{task.dueDate}</td>
            <td>
              {
                <Checkbox
                  align="centre"
                  checked={task.completed}
                  onChange={() => this.handleCompletedChange(task._id, task.taskName,
                    task.description, task.dueDate, task.createdBy, task.completed)}
                />
              }
            </td>
            <td>
              {
                <Button
                  id="editTaskBtn"
                  task={task._id}
                  onClick={() => this.handleEditTask(task._id, task.taskName, task.description,
                    task.dueDate, task.createdBy, task.completed)}
                >
                  <i className="far fa-edit" />
                </Button>
              }
            </td>
          </tr>
        ))
      }
      </tbody>
    );
  }
}

export default ActiveTasksList;
