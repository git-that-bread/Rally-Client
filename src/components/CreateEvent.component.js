import React, {Component} from 'react';
import {UserContext} from './UserContext';
import { Row, Col, Button, FormGroup, FormControl, FormLabel, Modal, InputGroup } from "react-bootstrap";
import DateTimePicker from 'react-datetime-picker';
import TimePicker from 'react-time-picker';
import ErrorMessage from './ErrorMessage.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import "../Login.css";

class CreateEvent extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            name: '',
            startTime: new Date(),
            endTime: new Date(),
            location: '',
            organization: '',
            error: null
        };
    }

    handleClose = () => {
        this.setState({showModal: false});
    };
    handleShow = () => {
        this.setState({showModal: true});
    };

    setEventName = (eventName) => {
        this.setState({eventName})
    };
    
    setStartTime = (date) => {
        this.setState({ startTime: date });
    };

    setEndTime = (date) => {
        this.setState({ endTime: date });
    };

    setOrganization = (organization) => {
        this.setState({organization});
    }

    setLocation = (location) => {
        this.setState({location});
    }



    handleSubmit = (e) => {
        console.log("submitted")
        e.preventDefault(); // avoids page reload
        const newEvent = {
            eventName: this.state.eventName,
            organization: this.state.organization,
            location: this.state.location,
            startTime: this.state.startTime,
            endTime: this.state.endTime
        }
        axios.post(`${process.env.REACT_APP_API_URL}/admin/event`, newEvent).then((res) => {
            console.log(res);
            this.handleClose();
           // window.location.reload();
        }).catch((error) => {
            console.error(error);
            this.setState({error});
            this.handleClose();
        });
    }

    componentDidMount() {
        this.setOrganization(this.context.user.underlyingUser.organization);
    }

    render() {
        return(
            <div>
                <Button variant="primary" onClick={this.handleShow}>
                    Create New Event
                </Button>
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    { this.state.error &&
                        <ErrorMessage errorMessage={this.state.error.message}></ErrorMessage>
                    }
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
                            <FormGroup controlId="event-start-time" bssize="large">
                                <FormLabel> Event Start Time </FormLabel>
                                <DateTimePicker
                                    onChange={this.setStartTime}
                                    value={this.state.startTime}
                                />
                            </FormGroup>
                            <FormGroup controlId="event-end-time" bssize="large">
                                <FormLabel> Event End Time </FormLabel>
                                <DateTimePicker
                                    onChange={this.setEndTime}
                                    value={this.state.endTime}
                                />
                            </FormGroup>
                          
                            <FormGroup controlId="location" bssize="large">
                                <FormLabel> Location </FormLabel>
                                <FormControl
                                    autoFocus
                                    type="text"
                                    value={this.location}
                                    onChange={e => this.setLocation(e.target.value)}
                                />
                            </FormGroup>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleSubmit}>
                        Submit
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            
        );
        
    }
}

export default withRouter(CreateEvent);