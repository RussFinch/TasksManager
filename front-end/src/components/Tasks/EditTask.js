import React, {
  Component,
} from 'react';
import {
  Redirect,
} from 'react-router-dom';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button,
  Checkbox,
} from 'react-bootstrap';
import axios from 'axios';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

class EditTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskId: '',
      taskName: '',
      description: '',
      dueDate: '',
      createdBy: '',
      completed: '',
      editTask: '',
    };
    this.handleTaskNameChange = this.handleTaskNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDueDateChange = this.handleDueDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
  }

  componentWillMount() {
    const {
      location,
    } = this.props;
    const {
      taskId, taskName, description, dueDate, createdBy, completed,
    } = location;
    this.setState({
      taskId, taskName, description, dueDate, createdBy, completed,
    });
  }

  getValidationState() {
    const {
      taskName,
    } = this.state;
    const {
      length,
    } = taskName;
    if (length <= 0) return 'error';
    return null;
  }

  handleCompletedChange() {
    const {
      completed,
    } = this.state;
    const updateCompleted = !completed;
    this.setState({
      completed: updateCompleted,
    });
  }

  handleTaskNameChange(event) {
    this.setState({
      taskName: event,
    });
  }

  handleDescriptionChange(event) {
    this.setState({
      description: event,
    });
  }

  handleDueDateChange(event) {
    this.setState({
      dueDate: event,
    });
  }

  handleDeleteTask() {
    const {
      location,
    } = this.props;
    const {
      editTask,
    } = location;
    const {
      taskId,
    } = this.state;
    axios.delete('https://russfincham.com:8443/tasks/' + taskId);
    this.setState({
      editTask,
    });
  }

  handleSubmit(event) {
    const {
      taskName,
      description,
      dueDate,
      completed,
      createdBy,
      taskId,
    } = this.state;
    const {
      location,
    } = this.props;
    const {
      editTask,
    } = location;
    event.preventDefault();
    const updateTask = {
      taskName,
      description,
      dueDate,
      completed,
      createdBy,
    };
    axios.put('https://russfincham.com:8443/tasks/' + taskId, {
      updateTask,
    });
    this.setState({
      editTask,
    });
  }

  render() {
    const {
      auth,
    } = this.props;
    const {
      editTask, taskName, description, dueDate, completed,
    } = this.state;
    const { isAuthenticated } = auth;
    if (editTask === 'active') {
      return (
        <Redirect to={{
          pathname: '/active',
        }}
        />
      );
    }
    if (editTask === 'overdue') {
      return (
        <Redirect to={{
          pathname: '/overdue',
        }}
        />
      );
    }
    if (editTask === 'deadline') {
      return (
        <Redirect to={{
          pathname: '/deadline',
        }}
        />
      );
    }
    return (
      <div className="container">
        {
          !isAuthenticated()
          && <p>Log in to edit a new task.</p>
        }
        <h1>Edit Task</h1>
        <form onSubmit={this.handleSubmit}>
          <FormGroup
            controlId="tName"
            validationState={this.getValidationState()}
          >
            <ControlLabel>Task Name</ControlLabel>
            <FormControl
              type="text"
              className="validate"
              name="taskName"
              value={taskName}
              onChange={this.handleTaskNameChange}
            />
            <FormControl.Feedback />
            <HelpBlock>Task Name cannot be empty...</HelpBlock>
          </FormGroup>
          <FormGroup
            controlId="tDescription"
          >
            <p>Description</p>
            <FormControl
              type="text"
              className="validate"
              name="description"
              value={description}
              onChange={this.handleDescriptionChange}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup>
            <p>Due Date</p>
            <DayPickerInput
              value={dueDate}
              onDayChange={this.handleDueDateChange}
            />
          </FormGroup>
          <FormGroup>
            <p>Complete?</p>
            <Checkbox
              align="centre"
              checked={completed}
              onChange={() => this.handleCompletedChange()}
            />
          </FormGroup>
          <Button
            bsStyle="primary"
            type="submit"
          >
            Submit
          </Button>
          <Button
            bsStyle="primary"
            onClick={this.handleDeleteTask}
          >
            Delete
          </Button>
        </form>
      </div>
    );
  }
}

export default EditTask;
