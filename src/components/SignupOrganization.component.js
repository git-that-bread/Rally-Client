import React, {Component} from 'react';
import { Button, FormGroup, FormControl, FormLabel , Alert} from "react-bootstrap";
import ErrorMessage from './ErrorMessage.component';
import { getJwt } from './helpers/jwt';
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
            orgEmail: '',
            success: false,
            error: false
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
        axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, {
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
            this.setState({success: true});
        }).catch((error) => {
            console.log(error)
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
        if(this.state.success) {
            setTimeout(() => { 
                this.props.history.replace('/login');
            }, 5000)

            return(
                <div >
                    <Alert variant="success">
                        <p>Successfully created organization account!</p>
                        <p>Redirecting to log in page...</p>
                    </Alert>
                </div>
            );
        }
        return(
            <div className="Signup">
                { this.state.error &&
                    <ErrorMessage errorMessage={this.state.error.message}></ErrorMessage>
                }
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="text" bssize="large">
                    <FormLabel>Organization's Name</FormLabel>
                    <FormControl
                        value={this.orgName}
                        onChange={e => this.setOrgName(e.target.value)}
                        type="text"
                    />
                    </FormGroup>
                    <FormGroup controlId="text" bssize="large">
                    <FormLabel>Organization's Location</FormLabel>
                    <FormControl
                        value={this.location}
                        onChange={e => this.setLocation(e.target.value)}
                        type="text"
                    />
                    </FormGroup>
                    <FormGroup controlId="text" bssize="large">
                    <FormLabel>Organization's Email</FormLabel>
                    <FormControl
                        value={this.orgEmail}
                        onChange={e => this.setOrgEmail(e.target.value)}
                        type="text"
                    />
                    </FormGroup>
                    <FormGroup controlId="name" bssize="large">
                    <FormLabel>Admin's Name</FormLabel>
                    <FormControl
                        autoFocus
                        type="text"
                        value={this.adminName}
                        onChange={e => this.setAdminName(e.target.value)}
                    />
                    </FormGroup>
                    <FormGroup controlId="username" bssize="large">
                    <FormLabel>Admin's Username</FormLabel>
                    <FormControl
                        autoFocus
                        type="username"
                        value={this.username}
                        onChange={e => this.setUsername(e.target.value)}
                    />
                    </FormGroup>
                    <FormGroup controlId="email" bssize="large">
                    <FormLabel>Admin's Email</FormLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={this.email}
                        onChange={e => this.setEmail(e.target.value)}
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
                    <Button block bssize="large" disabled={!this.validateForm()} type="submit">
                        Sign Up
                    </Button>
                </form>
            </div>
        );
        
    }
}

export default SignupOrganization;