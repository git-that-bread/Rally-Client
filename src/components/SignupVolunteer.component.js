import React, {Component} from 'react';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import axios from 'axios';
import "../Signup.css";

class SignupVolunteer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            userType: ''
        };
    }

    setUsername = (username) => {
        this.setState({username});

    }

    setPassword = (password) => {
        this.setState({password});
    }

    setEmail = (email) => {
        this.setState({email});
    }

    setName = (name) => {
        this.setState({name});
    }

    validateForm = () => {
        // TODO: more validation
        return this.state.username && this.state.password && this.state.email;
    }

    handleSubmit = (e) => {
        console.log("submitted")
        e.preventDefault(); // avoids page reload
        axios.post('http://localhost:8000/api/auth/signup', {
            name: this.state.name,
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            userType: 'volunteer'
        }).then((res) => {
            console.log(res);
            // TODO: LOGIN and show dashboard
            //localStorage.setItem('user-jwt', res.data.token);
        }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        return(
            <div className="Signup">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="name" bsSize="large">
                    <FormLabel>Name</FormLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        value={this.name}
                        onChange={e => this.setName(e.target.value)}
                    />
                    </FormGroup>
                    <FormGroup controlId="username" bsSize="large">
                    <FormLabel>username</FormLabel>
                    <FormControl
                        autoFocus
                        type="username"
                        value={this.username}
                        onChange={e => this.setUsername(e.target.value)}
                    />
                    </FormGroup>
                    <FormGroup controlId="email" bsSize="large">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={this.email}
                        onChange={e => this.setEmail(e.target.value)}
                    />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        value={this.password}
                        onChange={e => this.setPassword(e.target.value)}
                        type="password"
                    />
                    </FormGroup>
                    <Button block bsSize="large" disabled={!this.validateForm()} type="submit">
                        Signup
                    </Button>
                </form>
            </div>
        );
        
    }
}

export default SignupVolunteer;