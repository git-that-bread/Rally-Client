import React, { Component } from 'react';
import axios from 'axios';
import { getJwt } from './helpers/jwt';
import { withRouter } from 'react-router-dom';
import { UserContext } from './UserContext';

// This component will check that a user is logged in

class Authenticated extends Component {
    static contextType = UserContext;
    constructor(props){
        super(props);
        this.state = {
            user: null,
        };
    }
    

    _initUser(user) {
        //Let's fill the context with some value! You can get it from db too.
        //Call our setUser method that we declared in App Component.
        this.context.setUser(user);
        console.log("context after setting user")
        console.log(this.context)
        this.setState({ user }, () => {
            console.log("authenticated state")
            console.log(this.state.user)
        })
        
    }

    componentDidMount() {
        const jwt = getJwt();
        if(!jwt) {
           // redirect
           this.props.history.replace('/login');
        }

        axios.get(`${process.env.REACT_APP_API_URL}/auth/getUser`, {headers: {Authorization: `Bearer ${jwt}`}}).then((res) => {
            console.log(res)
            this._initUser(res.data.user, res.data.user.userType);
        }).catch((error) => {
            console.log(error.response);
            localStorage.removeItem('user-jwt');
            // TODO: generate proper error message
            // redirect user to login
            this.setState({error: true});
            this.props.history.replace('/login');
        })
    }
    render() {
        if(!this.state.user) {
            return(
                <div>
                    Loading...
                </div>
            );
        }

        return(
            <div>
                {this.props.children}  {/* will display w/e is between <Authenticated></Authenticated> in App.js*/}
            </div>
        );
        
    }
}

export default withRouter(Authenticated);