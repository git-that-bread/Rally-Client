import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home.component';
import Authenticated from './components/Authenticated.component';
import Login from './components/Login.component';
import SignupVolunteer from './components/SignupVolunteer.component';
import SignupOrganization from './components/SignupOrganization.component';
import Logout from './components/Logout.component';
import LearnMore from './components/LearnMore.component';
import { UserContext } from './components/UserContext';
import MainNav from "./components/MainNav.component";
import Dashboard from './components/Dashboard.component';
import IndexStyle from './index.module.css';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: null,
      setUser: this.setUser
    };
  }
  //This is the method to set the context data.
  setUser = (user) => {
    console.log("setting user")
    console.log(user)
    this.setState({ user });
    console.log(this.state)
  };
  
  render() {
    return (
      <div className={IndexStyle.mainWrapper}>
        <UserContext.Provider value={this.state}>
          <BrowserRouter>
          <MainNav/>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/login" exact component={Login} />
              <Route path="/signupVolunteer" exact component={SignupVolunteer} />
              <Route path="/signupOrganization" exact component={SignupOrganization} />
              <Route path="/logout" exact component={Logout} />
              <Route path="/learnMore" exact component={LearnMore} />
              <Authenticated>
                <Route path="/dashboard" component={Dashboard} />
              </Authenticated>
            </Switch>
          </BrowserRouter>
        </UserContext.Provider>
      </div>
    );
  }
}

export default App;
