import React, {Component} from 'react';
import { Button, FormGroup, FormControl, FormLabel, Modal } from "react-bootstrap";
import axios from 'axios';
import "../Login.css";

class CreateEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        };
    }

    handleClose = () => {
        this.setState({showModal: false});
    };
    handleShow = () => {
        this.setState({showModal: true});
    };

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
            <div>
                <Button variant="primary" onClick={this.handleShow}>
                    Create New Event
                </Button>

                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Create an Event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup controlId="name" bsSize="large">
                            <FormLabel>Event Name</FormLabel>
                            <FormControl
                                autoFocus
                                type="text"
                                value={this.name}
                                onChange={e => this.setEventName(e.target.value)}
                            />
                            </FormGroup>
                            {/* <Button block bsSize="large" disabled={!this.validateForm()} type="submit">
                                Login
                            </Button> */}
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleClose}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            
        );
        
    }
}

export default CreateEvent;