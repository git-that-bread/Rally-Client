import React, {Component} from 'react';
import axios from 'axios';

export default class AddVolunteer extends Component {
    constructor(props){
        super(props);

        this.whenNameModified = this.whenNameModified.bind(this);
        this.whenUserNameModified = this.whenUserNameModified.bind(this);
        this.whenPasswordModified = this.whenPasswordModified.bind(this);
        this.whenVolEmailModified = this.whenVolEmailModified.bind(this);
        this.submission = this.submission.bind(this);

        this.state ={
            name: '',
            username: '',
            password: '',
            volEmail: ''

        }
    }

    whenNameModified(thisObject){
        this.setState({
            name: thisObject.target.value
        });
    }

    whenUserNameModified(thisObject){
        this.setState({
            username: thisObject.target.value
        });
    }

    whenPasswordModified(thisObject){
        this.setState({
            password: thisObject.target.value
        });
    }

    whenVolEmailModified(thisObject){
        this.setState({
            volEmail: thisObject.target.value
        });
    }

    submission(thisObject){
        thisObject.preventDefault();

        const newVolunteer = {
            name: this.state.name,
            username: this.state.username,
            password: this.state.password,
            volEmail: this.state.volEmail
        }

        console.log(newVolunteer);

        axios.post('http://localhost:8000/volunteer/add', newVolunteer)
        .catch(function(err){
            console.log(err.response);
        });

        window.location = '/';
    }


    render() {
        return (
            <div style={{marginTop: 20}}>
            <h3>Create a Volunteer Account</h3>
            <form onSubmit={this.submission}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" className="form-control" value={this.state.name} onChange={this.whenNameModified}/>
                </div>
                <div className="form-group">
                    <label>Username:</label>
                    <input type="text" className="form-control" value={this.state.username} onChange={this.whenUserNameModified}/>
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="text" className="form-control" value={this.state.password} onChange={this.whenPasswordModified}/>
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="text" className="form-control" value={this.state.volEmail} onChange={this.whenVolEmailModified}/>
                </div>
                <div className="form-group">
                    <input type="submit" value="Submit" className="btn btn-primary"/>
                </div>
            </form>
        </div>
        )
    }
}