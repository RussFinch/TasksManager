import React, {
  Component,
} from 'react';
import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
  Button,
} from 'react-bootstrap';
import axios from 'axios';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: '',
      description: '',
      dueDate: new Date(),
      createdBy: '',
      profile: {},
    };
    this.handleTaskNameChange = this.handleTaskNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleDueDateChange = this.handleDueDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
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

  handleTaskNameChange(event) {
    const {
      profile,
    } = this.state;
    this.setState({
      taskName: event.target.value,
      createdBy: profile.name,
    });
  }

  handleDescriptionChange(event) {
    this.setState({
      description: event.target.value,
    });
  }

  handleDueDateChange(event) {
    this.setState({
      dueDate: event,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const {
      taskName,
      description,
      createdBy,
      dueDate,
    } = this.state;
    const newTask = {
      taskName,
      description,
      createdBy,
      dueDate,
    };

    axios.post('https://russfincham.com:8443/tasks/addtask', {
      newTask,
    });

    this.setState({
      taskName: '',
      description: '',
      dueDate: '',
    });
  }

  render() {
    const {
      taskName,
      description,
      dueDate,
    } = this.state;
    const {
      auth,
    } = this.props;
    const {
      isAuthenticated,
    } = auth;
    return (
      <div className="container">
        <h1>Add Task</h1>
        {
        !isAuthenticated() && <p>Log in to edit a new task.</p>
        }
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
          <Button
            bsStyle="primary"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default AddTask;
