import React, {Component} from 'react';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import axios from 'axios';
import "../Login.css";

class LoginOrganization extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
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
        axios.post('http://localhost:8000/api/auth/login', {
            username: this.state.username,
            password: this.state.password
        }).then((res) => {
            console.log(res);
            localStorage.setItem('user-jwt', res.data.token);
        })
    }

    render() {
        return(
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="username" bsSize="large">
                    <FormLabel>admin username</FormLabel>
                    <FormControl
                        autoFocus
                        type="username"
                        value={this.username}
                        onChange={e => this.setUsername(e.target.value)}
                    />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                    <FormLabel>admin Password</FormLabel>
                    <FormControl
                        value={this.password}
                        onChange={e => this.setPassword(e.target.value)}
                        type="password"
                    />
                    </FormGroup>
                    <Button block bsSize="large" disabled={!this.validateForm()} type="submit">
                        Login
                    </Button>
                </form>
            </div>
        );
        
    }
}

export default LoginOrganization;