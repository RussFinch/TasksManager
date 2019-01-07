import React, {
  Component,
} from 'react';
import {
  Table,
  FormGroup,
} from 'react-bootstrap';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import DeadlineTasksList from './DeadlineTasksList';
import 'react-day-picker/lib/style.css';

class Deadline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deadline: new Date(),
    };
    this.handleDeadlineChange = this.handleDeadlineChange.bind(this);
  }

  handleDeadlineChange(event) {
    this.setState({
      deadline: event,
    });
  }

  render() {
    const {
      deadline,
    } = this.state;
    const {
      auth,
    } = this.props;
    return (
      <div className="container">
        <div className="App">
          <h1 align="left">Deadline Task List</h1>
          <form align="centre">
            <FormGroup>
              <p>Please Select Deadline</p>
              <DayPickerInput
                value={deadline}
                onDayChange={this.handleDeadlineChange}
              />
            </FormGroup>
          </form>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>Task Name</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Completed</th>
                <th />
              </tr>
            </thead>
            {
              <DeadlineTasksList
                auth={auth}
                deadline={deadline}
                props={this.props}
              />
            }
          </Table>
        </div>
      </div>
    );
  }
}

export default Deadline;
