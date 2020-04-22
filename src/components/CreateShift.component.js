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
import moment from 'moment';

class CreateShift extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            startTime: new Date(),
            endTime: new Date(),
            spots: 0,
            error: null
        };
    }

    handleClose = () => {
        this.setState({showModal: false});
    };
    handleShow = () => {
        this.setState({showModal: true});
    };
    
    setStartTime = (date) => {
        this.setState({ startTime: date });
    };

    setEndTime = (date) => {
        this.setState({ endTime: date });
    };

    setSpots = (spots) => {
        this.setState({spots});
    }




    handleSubmit = (e) => {
        console.log("submitted")
        e.preventDefault(); // avoids page reload
        const newShift = {
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            maxSpots: this.state.spots,
            eventId: this.props.event._id,
            organizationId: this.props.event.organization

        }
        axios.post(`${process.env.REACT_APP_API_URL}/admin/shift`, newShift).then((res) => {
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
    }

    render() {
        return(
            <div>
                <Button variant="primary" onClick={this.handleShow}>
                    Add Shift
                </Button>
                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    { this.state.error &&
                        <ErrorMessage errorMessage={this.state.error.message}></ErrorMessage>
                    }
                    <Modal.Header closeButton>
                    <Modal.Title>Create a Shift</Modal.Title>
                    </Modal.Header>
                    <Modal.Body> 
                        <form onSubmit={this.handleSubmit}>
                            <FormGroup  bssize="large">
                                <FormLabel> Shift Start Time </FormLabel>
                                <DateTimePicker
                                    minTime={this.props.event.startTime}
                                    maxTime={this.props.event.endTime}
                                    onChange={this.setStartTime}
                                    value={this.state.startTime}
                                />
                            </FormGroup>
                            <FormGroup controlId="event-end-time" bssize="large">
                                <FormLabel> Shift End Time </FormLabel>
                                <DateTimePicker
                                    minTime={moment(this.props.event.startTime)}
                                    maxTime={moment(this.props.event.endTime)}
                                    onChange={this.setEndTime}
                                    value={this.state.endTime}
                                />
                            </FormGroup>
                          
                            <FormGroup controlId="location" bssize="large">
                                <FormLabel> Spots </FormLabel>
                                <FormControl size="small"
                                    autoFocus
                                    type="number"
                                    value={this.spots}
                                    onChange={e => this.setSpots(e.target.value)}
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

export default withRouter(CreateShift);