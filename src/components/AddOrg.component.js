import React, {Component} from 'react';
import axios from 'axios';

export default class AddOrg extends Component {
    constructor(props){
        super(props);

        this.whenNameModified = this.whenNameModified.bind(this);
        this.whenLocationModified = this.whenLocationModified.bind(this);
        this.whenorgEmailModified = this.whenorgEmailModified.bind(this);
        this.whenorgPhoneModified = this.whenorgPhoneModified.bind(this);
        this.whenAdminModified = this.whenAdminModified.bind(this);
        this.whenAdminUsernameModified = this.whenAdminUsernameModified.bind(this);
        this.whenAdminPasswordModified = this.whenAdminPasswordModified.bind(this);
        this.whenAdminEmailModified = this.whenAdminEmailModified.bind(this);
        this.whenAdminPhoneModified = this.whenAdminPhoneModified.bind(this);
       
        this.submission = this.submission.bind(this);

        this.state ={
            name: '',
            location: '',
            orgEmail: '',
            orgPhone: '',
            adminName: '',
            adminUsername: '', 
            adminPassword: '',
            adminEmail: '',
            adminPhone: ''

        }
    }

    whenNameModified(thisObject){
        this.setState({
            name: thisObject.target.value
        });
    }
    whenLocationModified(thisObject){
        this.setState({
            location: thisObject.target.value
        });
    }
    whenorgEmailModified(thisObject){
        this.setState({
            orgEmail: thisObject.target.value
        });
    }
    whenorgPhoneModified(thisObject){
        this.setState({
            orgPhone: thisObject.target.value
        });
    }

    whenAdminModified(thisObject){
        this.setState({
            adminName: thisObject.target.value
        });
    }
    whenAdminUsernameModified(thisObject){
        this.setState({
            adminUsername: thisObject.target.value
        });
    }

    whenAdminPasswordModified(thisObject){
        this.setState({
            adminPassword: thisObject.target.value
        });
    }
    whenAdminEmailModified(thisObject){
        this.setState({
            adminEmail: thisObject.target.value
        });
    }
    whenAdminPhoneModified(thisObject){
        this.setState({
            adminPhone: thisObject.target.value
        });
    }

    submission(thisObject){
        thisObject.preventDefault();

        const newOrg = {
            name: this.state.name,
            location: this.state.location,
            orgEmail: this.state.orgEmail,
            orgPhone: this.state.orgPhone,
            adminName: this.state.adminName,
            adminUsername: this.state.adminUsername,
            adminPassword: this.state.adminPassword,
            adminEmail: this.state.adminEmail,
            adminPhone: this.state.adminPhone
        }

        console.log(newOrg);

        axios.post('http://localhost:8000/orgs/add', newOrg)
        .catch(function(err){
            console.log(err.response);
        });

        window.location = '/';
    }


    render() {
        return (
            <div style={{marginTop: 20}}>
            <h3>Create an Organization</h3>
            <form onSubmit={this.submission}>
                <div className="form-group">
                    <label>Organization Name:</label>
                    <input type="text" className="form-control" value={this.state.name} onChange={this.whenNameModified}/>
                </div>
                <div className="form-group">
                    <label>Organization Location:</label>
                    <input type="text" className="form-control" value={this.state.location} onChange={this.whenLocationModified}/>
                </div>
                <div className="form-group">
                    <label>Organization Email:</label>
                    <input type="text" className="form-control" value={this.state.orgEmail} onChange={this.whenorgEmailModified}/>
                </div>
                <div className="form-group">
                    <label>Organization Phone:</label>
                    <input type="text" className="form-control" value={this.state.orgPhone} onChange={this.whenorgPhoneModified}/>
                </div>
                <h3>Create an Administrator Account</h3>
                <p>This will be used to manage your Organization</p>
                <div className="form-group">
                    <label>Admin Name:</label>
                    <input type="text" className="form-control" value={this.state.admin} onChange={this.whenAdminModified}/>
                </div>
                <div className="form-group">
                    <label>Admin Username:</label>
                    <input type="text" className="form-control" value={this.state.adminUsername} onChange={this.whenAdminUsernameModified}/>
                </div>
                <div className="form-group">
                    <label>Admin Password:</label>
                    <input type="text" className="form-control" value={this.state.adminPassword} onChange={this.whenAdminPasswordModified}/>
                </div>
                <div className="form-group">
                    <label>Admin Email:</label>
                    <input type="text" className="form-control" value={this.state.adminEmail} onChange={this.whenAdminEmailModified}/>
                </div>
                <div className="form-group">
                    <label>Admin Phone:</label>
                    <input type="text" className="form-control" value={this.state.adminPhone} onChange={this.whenAdminPhoneModified}/>
                </div>
                <div className="form-group">
                    <input type="submit" value="Submit" className="btn btn-primary"/>
                </div>
            </form>
        </div>
        )
    }
}