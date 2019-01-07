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

class OverDueTasksList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      editTask: false,
      profile: {},
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

  componentWillMount() {
    const {
      auth,
    } = this.props;
    const {
      userProfile,
      getProfile,
    } = auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({
          profile,
        });
      });
    } else {
      this.setState({
        profile: userProfile,
      });
    }
  }

  componentDidMount() {
    const {
      deadline,
    } = this.props;
    this.collectTasks(deadline);
  }

  componentWillReceiveProps(newProp) {
    const {
      deadline,
    } = this.props;
    if (deadline !== newProp.deadline) {
      const newDeadline = newProp.deadline;
      this.collectTasks(newDeadline);
    }
  }

  collectTasks(deadline) {
    const {
      profile,
    } = this.state;
    axios.get('https://russfincham.com:8443/tasks/deadlineTasks/' + profile.name
      + '/' + deadline)
      .then((res) => {
        const response = res.data;
        this.setState({
          tasks: response,
        });
      });
  }

  handleCompletedChange(taskId, name, description, dueDate, createdBy, completed) {
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
      .then(this.collectTasks());
  }

  handleEditTask(taskId, name, description, dueDate, createdBy, completed) {
    this.setState({
      taskId,
    });
    this.setState({
      taskName: name,
    });
    this.setState({
      description,
    });
    this.setState({
      dueDate,
    });
    this.setState({
      createdBy,
    });
    this.setState({
      completed,
    });
    this.setState({
      editTask: true,
    });
  }

  render() {
    const {
      editTask, taskId, taskName, description, dueDate, createdBy, completed, tasks,
    } = this.state;
    if (editTask) {
      return (
        <Redirect to={{
          pathname: '/tasks/editTask',
          taskId,
          taskName,
          description,
          dueDate,
          createdBy,
          completed,
          editTask: 'deadline',
        }}
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
                    onClick={() => this.handleEditTask(task._id, task.taskName,
                      task.description, task.dueDate, task.createdBy, task.completed)}
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

export default OverDueTasksList;
