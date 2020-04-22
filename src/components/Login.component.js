import React, {Component} from 'react';
import { Button, FormGroup, FormControl, FormLabel, Alert } from "react-bootstrap";
import axios from 'axios';
import ErrorMessage from './ErrorMessage.component';
import { getJwt } from './helpers/jwt';
import "../Login.css";

class LoginVolunteer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            loggedIn: false,
            error: null
        };
    }

    setUsername = (username) => {
        this.setState({username});

    }

    setPassword = (password) => {
        this.setState({password});
    }

    validateForm = () => {
        // TODO: more validation
        return this.state.username && this.state.password;
    }

    handleSubmit = (e) => {
        console.log("submitted")
        e.preventDefault(); // avoids page reload
        axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
            username: this.state.username,
            password: this.state.password
        }).then((res) => {
            console.log(res);
            localStorage.setItem('user-jwt', res.data.token);
            this.props.history.replace('/dashboard');
        }).catch((error) => {
            console.log(error);
            this.setState({error: error.response ? error.response.data.error : error});
        })
    }

    componentDidMount() {
        const jwt = getJwt();
        if(jwt) {
           // redirect
           this.props.history.replace('/dashboard');
        }
    }

    render() {
        return(
            <div className="Login">
            { this.state.error &&
                <ErrorMessage errorMessage={this.state.error.message}></ErrorMessage>
            }
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="username" bssize="large">
                    <FormLabel>Username</FormLabel>
                    <FormControl
                        autoFocus
                        type="username"
                        value={this.username}
                        onChange={e => this.setUsername(e.target.value)}
                    />
                    </FormGroup>
                    <FormGroup controlId="password" bssize="large">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        value={this.password}
                        onChange={e => this.setPassword(e.target.value)}
                        type="password"
                    />
                    </FormGroup>
                    <button class="btn btn-primary btn-lg btn-block" disabled={!this.validateForm()} type="submit">
                        Login
                    </button>
                    <a class="btn btn-secondary btn-lg btn-block" href="/" type="cancel">
                        Cancel
                    </a>
                </form>
            </div>
        );
        
    }
}

export default LoginVolunteer;