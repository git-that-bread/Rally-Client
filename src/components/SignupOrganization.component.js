import React, {Component} from 'react';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import axios from 'axios';
import "../Signup.css";

class SignupOrganization extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            adminName: '',
            orgName: '',
            location: '',
            orgEmail: ''
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

    setAdminName = (adminName) => {
        this.setState({adminName});
    }

    setOrgName = (orgName) => {
        this.setState({orgName});
    }

    setLocation = (location) => {
        this.setState({location});
    }

    setOrgEmail = (orgEmail) => {
        this.setState({orgEmail});
    }

    validateForm = () => {
        // TODO: more validation
        return this.state.username && this.state.password && this.state.email;
    }

    handleSubmit = (e) => {
        console.log("submitted")
        e.preventDefault(); // avoids page reload
        axios.post('http://localhost:8000/api/auth/signup', {
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            orgName: this.state.orgName,
            adminName: this.state.adminName,
            orgEmail: this.state.orgEmail,
            location: this.state.location,
            userType: 'admin'
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
                    <FormGroup controlId="text" bsSize="large">
                    <FormLabel>Organization's Name</FormLabel>
                    <FormControl
                        value={this.orgName}
                        onChange={e => this.setOrgName(e.target.value)}
                        type="text"
                    />
                    </FormGroup>
                    <FormGroup controlId="text" bsSize="large">
                    <FormLabel>Organization's Location</FormLabel>
                    <FormControl
                        value={this.location}
                        onChange={e => this.setLocation(e.target.value)}
                        type="text"
                    />
                    </FormGroup>
                    <FormGroup controlId="text" bsSize="large">
                    <FormLabel>Organization's Email</FormLabel>
                    <FormControl
                        value={this.orgEmail}
                        onChange={e => this.setOrgEmail(e.target.value)}
                        type="text"
                    />
                    </FormGroup>
                    <FormGroup controlId="name" bsSize="large">
                    <FormLabel>Admin's Name</FormLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        value={this.adminName}
                        onChange={e => this.setAdminName(e.target.value)}
                    />
                    </FormGroup>
                    <FormGroup controlId="username" bsSize="large">
                    <FormLabel>Admin's Username</FormLabel>
                    <FormControl
                        autoFocus
                        type="username"
                        value={this.username}
                        onChange={e => this.setUsername(e.target.value)}
                    />
                    </FormGroup>
                    <FormGroup controlId="email" bsSize="large">
                    <FormLabel>Admin's Email</FormLabel>
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

export default SignupOrganization;