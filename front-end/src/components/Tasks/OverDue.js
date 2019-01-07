import React, {
  Component,
} from 'react';
import {
  Table,
} from 'react-bootstrap';
import OverDueTasksList from './OverDueTasksList';

class OverDue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
    };
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

  render() {
    const {
      auth,
    } = this.props;
    const {
      profile,
    } = this.state;
    return (
      <div className="container">
        <div className="App">
          <h1 align="left">OverDue Task List</h1>
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
              <OverDueTasksList
                auth={auth}
                profile={profile}
                props={this.props}
              />
            }
          </Table>
        </div>
      </div>
    );
  }
}

export default OverDue;
