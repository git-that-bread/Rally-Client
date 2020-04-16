import React, {Component} from 'react';
import { Button, FormGroup, FormControl, FormLabel, Modal } from "react-bootstrap";
import DateTimePicker from 'react-datetime-picker';
import axios from 'axios';
import "../Login.css";

class CreateEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            name: '',
            startTime: new Date(),
            endTime: new Date(),
            location: '',
            organization: ''
        };
    }

    handleClose = () => {
        this.setState({showModal: false});
    };
    handleShow = () => {
        this.setState({showModal: true});
    };

    setEventName = (name) => {
        this.setEventName({name})
    };
    
    setStartTime = (date) => {
        this.setState({ startTime: date });
    };

    setEndTime = (date) => {
        this.setState({ endTime: date });
    };

    handleSubmit = (e) => {
        console.log("submitted")
        e.preventDefault(); // avoids page reload
        axios.post('http://localhost:8000/api/admin/event', {
            name: this.state.name,
            organization: this.state.organization,
            startTime: this.state.startTime,
            endTime: this.state.endTime
        }).then((res) => {
            console.log(res);
        }).catch((error) => {
            console.error(error)
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
                            <FormGroup controlId="name" bssize="large">
                                <FormLabel>Event Name</FormLabel>
                                <FormControl
                                    autoFocus
                                    type="text"
                                    value={this.name}
                                    onChange={e => this.setEventName(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup controlId="name" bssize="large">
                                <FormLabel> Event Start Time </FormLabel>
                                <DateTimePicker
                                    onChange={this.setStartTime}
                                    value={this.state.startTime}
                                />
                            </FormGroup>
                            <FormGroup controlId="name" bssize="large">
                                <FormLabel> Event End Time </FormLabel>
                                <DateTimePicker
                                    onChange={this.setEndTime}
                                    value={this.state.endTime}
                                />
                            </FormGroup>
                            
                            {/* <Button block bssize="large" disabled={!this.validateForm()} type="submit">
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