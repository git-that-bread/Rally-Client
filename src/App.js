import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home.component';
import Authenticated from './components/Authenticated.component';
import LoginVolunteer from './components/LoginVolunteer.component';
import LoginOrganization from './components/LoginOrganization.component';
import SignupVolunteer from './components/SignupVolunteer.component';
import SignupOrganization from './components/SignupOrganization.component';
import Dashboard from './components/Dashboard.component';
import Events from './components/Events.component';
import './App.css';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/loginVolunteer" exact component={LoginVolunteer} />
          <Route path="/loginOrganization" exact component={LoginOrganization} />
          <Route path="/signupVolunteer" exact component={SignupVolunteer} />
          <Route path="/signupOrganization" exact component={SignupOrganization} />
          <Route path="/" exact component={Home} />
          <Route path="/dashboard" component={Dashboard} />
          {/* <Authenticated>
          </Authenticated> */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
