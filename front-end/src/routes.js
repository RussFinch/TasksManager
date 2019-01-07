import React from 'react';
import { Redirect, Route, Router } from 'react-router-dom';
import App from './App';
import Home from './components/Home/Home';
import Callback from './components/Callback/Callback';
import Auth from './components/Auth/Auth';
import history from './history';
import Active from './components/Tasks/Active';
import Complete from './components/Tasks/Complete';
import OverDue from './components/Tasks/OverDue';
import AddTask from './components/Tasks/AddTask';
import Deadline from './components/Tasks/Deadline';
import EditTask from './components/Tasks/EditTask';

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

export const makeMainRoutes = () => (
  <Router history={history}>
    <div>
      <Route path="/" render={props => <App auth={auth} {...props} />} />
      <Route
        path="/home"
        render={props => (
          !auth.isAuthenticated() ? (
            <Redirect to="/" />
          ) : (
            <Home auth={auth} {...props} />
          )
        )}
      />
      <Route
        path="/active"
        exact="true"
        render={props => (
          
            <Active auth={auth} {...props} />
          )
        }
      />
      <Route
        path="/complete"
        exact="true"
        render={props => (
          !auth.isAuthenticated() ? (
            <Redirect to="/" />
          ) : (
            <Complete auth={auth} {...props} />
          )
        )}
      />
      <Route
        path="/overdue"
        exact="true"
        render={props => (
          !auth.isAuthenticated() ? (
            <Redirect to="/" />
          ) : (
            <OverDue auth={auth} {...props} />
          )
        )}
      />
      <Route
        path="/deadline"
        exact="true"
        render={props => (
          !auth.isAuthenticated() ? (
            <Redirect to="/" />
          ) : (
            <Deadline auth={auth} {...props} />
          )
        )}
      />
      <Route
        path="/tasks/addTask"
        render={props => (
          !auth.isAuthenticated() ? (
            <Redirect to="/" />
          ) : (
            <AddTask auth={auth} {...props} />
          )
        )}
      />
      <Route
        path="/tasks/editTask"
        render={props => (
          !auth.isAuthenticated() ? (
            <Redirect to="/" />
          ) : (
            <EditTask auth={auth} {...props} />
          )
        )}
      />
      <Route
        path="/callback"
        render={(props) => {
          handleAuthentication(props);
          return (
            <Callback
              {...props}
            />
          );
        }}
      />
    </div>
  </Router>
);
