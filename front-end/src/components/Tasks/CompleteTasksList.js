import React, {
  Component,
} from 'react';
import {
  Checkbox,
} from 'react-bootstrap';
import axios from 'axios';

class CompleteTasksList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
    };
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
    axios.get('https://russfincham.com:8443/tasks/completeTasks/' + user)
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

  render() {
    const {
      tasks,
    } = this.state;
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
            </tr>
          ))
        }
      </tbody>
    );
  }
}


export default CompleteTasksList;
