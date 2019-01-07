import React, {
  Component,
} from 'react';
import {
  Navbar,
  Button,
} from 'react-bootstrap';
import './App.css';

class App extends Component {
  goTo(route) {
    const {
      history,
    } = this.props;
    history.replace(`/${route}`);
  }

  login() {
    const {
      auth,
    } = this.props;
    auth.login();
  }

  logout() {
    const {
      auth,
    } = this.props;
    auth.logout();
  }

  render() {
    const {
      auth,
    } = this.props;
    const {
      isAuthenticated,
    } = auth;

    return (
      <div>
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/#Home">Tasks Manager</a>
            </Navbar.Brand>
            { isAuthenticated() && (
            <Button
              id="homeBtn"
              className="waves-effect waves-light btn"
              onClick={this.goTo.bind(this, 'home')}
            >
            Home
            </Button>
            )
            }
            { isAuthenticated() && (
            <Button
              id="activeBtn"
              onClick={this.goTo.bind(this, 'active')}
            >
                  Active
            </Button>
            )
            }
            { isAuthenticated() && (
            <Button
              id="complpeteBtn"
              onClick={this.goTo.bind(this, 'complete')}
            >
                  Complete
            </Button>
            )
            }
            { isAuthenticated() && (
            <Button
              id="overdueBtn"
              onClick={this.goTo.bind(this, 'overdue')}
            >
                  Overdue
            </Button>
            )
            }
            { isAuthenticated() && (
            <Button
              id="deadlineBtn"
              onClick={this.goTo.bind(this, 'deadline')}
            >
                  Deadline
            </Button>
            )
            }
            { isAuthenticated() && (
            <Button
              id="addTaskBtn"
              className="waves-effect waves-light btn"
              onClick={this.goTo.bind(this, 'tasks/addtask')}
            >
                  Add Task
            </Button>
            )
            }
            { !isAuthenticated() && (
              <Button
                id="loginBtn"
                className="waves-effect waves-light btn"
                onClick={this.login.bind(this)}
              >
                Log In
              </Button>
            )
            }
            { isAuthenticated() && (
              <Button
                id="logoutBtn"
                className="waves-effect waves-light btn"
                onClick={this.logout.bind(this, '/')}
              >
                Log Out
              </Button>
            )
            }
          </Navbar.Header>
        </Navbar>
      </div>
    );
  }
}

export default App;
