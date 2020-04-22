import React, {Component} from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { Button, Row, Col, Card } from "react-bootstrap";
import axios from 'axios';
import moment from 'moment';
import ErrorMessage from './ErrorMessage.component';
import {getJwt} from './helpers/jwt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import DashboardStyle from './Dashboard.module.css';
import CreateShift from './CreateShift.component';
import "../Login.css";

const localizer = momentLocalizer(moment)
class VolunteerEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            eventName: '',
            event: props.location.state.event,
            shifts: null,
            calendarEvents: null,
            loadingShifts: true,
            jwt: null,
            error: null
        };
    }

    setShifts = (shifts) => {
        let calendarEvents = [];
        for(const [index, shift] in shifts.entries()) {
            calendarEvents.push({
                id: shift._id,
                title: `Shift ${index+1}`,
                start: moment(shift.startTime),
                end: moment(shift.endTime)
            });
        }
        this.setState({calendarEvents, shifts});
    }

    handleClose = () => {
        this.setState({showModal: false});
    };

    handleShow = () => {
        this.setState({showModal: true});
    };

    handleDelete = (e) => {
        console.log("submitted")
        e.preventDefault(); // avoids page reload
        axios.delete(`${process.env.REACT_APP_API_URL}/admin/event/${this.state.event._id}`, {headers: {Authorization: `Bearer ${this.state.jwt}`}})
        .then((res) => {
            console.log(res);
            this.props.history.replace('/dashboard/events');
        }).catch((error) => {
            console.error(error);
            this.setState({error});
        });
    }

    getShifts = (eventId) => {
        axios.get(`${process.env.REACT_APP_API_URL}/admin/event/shifts/${eventId}`, {headers: {Authorization: `Bearer ${this.state.jwt}`}})
        .then((res) => {
            console.log(res);
            this.setShifts(res.data.shifts);
            this.setState({loadingShifts: false});
        }).catch((error) => {
            console.error(error);
            this.setState({error});
        });
    }

    componentDidMount() {
        const jwt = getJwt();
        if(!jwt) {
           // redirect
           this.props.history.replace('/login');
        }
        console.log("event: e" + this.state.event)
        this.getShifts(this.state.event._id);
        this.setState({jwt});
    }

    render() {
        if(this.state.loadingShifts) {
            return (
                <div className={DashboardStyle.loader}>
                <FontAwesomeIcon icon={faSpinner} />
                    Loading Event...
            </div>
            );
        } else {
            return(
                <div>
                    <Row>
                        <Col md={8}>
                        { this.state.error &&
                            <ErrorMessage errorMessage={this.state.error.message}></ErrorMessage>
                        }
                            <Card>
                                <Card.Header>{this.state.event.name}</Card.Header>
                                <Card.Body>
                                    <Card.Title>{this.state.event.name}</Card.Title>
                                    <Card.Text>
                                     <p>Start Time: {moment(this.state.event.startTime).format('lll')}</p>
                                     <p>End Time: {moment(this.state.event.endTime).format('lll')}</p>
                                     <p>Location: {this.state.event.location}</p>
                                     <p>Volunteers: {this.state.event.volunteers.length}</p>
                                     <p>Shifts: {this.state.event.shifts.length}</p>
                                    </Card.Text>
                                    <div className={DashboardStyle.shiftCalendarWrapper} >
                                    <Calendar 
                                    events={this.state.calendarEvents}
                                    startAccessor="start"
                                    endAccessor="end"
                                    defaultDate={moment().toDate()}
                                    defaultView={'week'}
                                    localizer={localizer}
                                />
                                    </div>
                                </Card.Body>
                            </Card>
                            <Button>Edit</Button>
                            <CreateShift event={this.state.event}></CreateShift>
                            <Button onClick={this.handleDelete} variant="danger">Delete</Button>
                            
                        </Col>
                        <Col md={4}>
                        </Col>
                    </Row>
                </div>
                
            );
        }
        
    }
}

export default withRouter(VolunteerEvent);