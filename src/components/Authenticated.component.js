import React, {Component} from 'react';
import axios from 'axios';
import {getJwt} from './helpers/jwt';
import { withRouter } from 'react-router-dom';

// This component will check that a user is logged in

class Authenticated extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: undefined,
            userType: undefined
        };
    }

    componentDidMount() {
        const jwt = getJwt();
        if(!jwt) {
            this.props.history.push('./Login');
        }

        // TODO: change url to Request to get the user 
        axios.get('http://localhost:8000/', {headers: {Authorization: `Bearer ${jwt}`}}).then((res) => {
            console.log(res)
            this.setState({user: res.data});
        }).catch((error) => {
            console.log(error);
            localStorage.removeItem('user-jwt');
            // TODO: generate proper error message
            // redirect user to login
            this.props.history.push('./Login');

        })
    }
    render() {
        if(this.state.user === undefined) {
            return(
                <div>
                    <h1>Loading...</h1>
                </div>
            );
        }
        return(
            <div>
                Authenticated
                {this.props.children}  {/* will display w/e is between <Authenticated></Authenticated> in App.js*/}
                
            </div>
        );
        
    }
}

export default withRouter(Authenticated);