import React, {Component} from 'react';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import { Button, Row, Col, Card } from "react-bootstrap";
import axios from 'axios';
import moment from 'moment';
import ErrorMessage from './ErrorMessage.component';
import {getJwt} from './helpers/jwt';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faUsers, faTrash, faWindowClose, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import DashboardStyle from './Dashboard.module.css';
import ShiftVolunteers from './ShiftVolunteers.component';
import CreateShift from './CreateShift.component';
import "../Login.css";

const localizer = momentLocalizer(moment)

class VolunteerEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            eventName: '',
            event: null,
            shifts: null,
            calendarEvents: null,
            loadingShifts: true,
            loadingEvent: true,
            currentShift: null,
            mouseUp: false,
            mouseDown: false,
            jwt: null,
            error: null
        };
    }

    setShifts = (shifts) => {
        let calendarEvents = [];
        for(var i = 0; i < shifts.length; i++) {
            const shift = shifts[i];
            calendarEvents.push({
                id: shift._id,
                title: `Shift ${i+1}`,
                start: new Date(shift.startTime),
                end: new Date(shift.endTime),
                shift: shift 
            });
        }
        this.setState({calendarEvents, shifts});
        console.log("calendar Events")
        console.log(this.state.calendarEvents)
    }

    handleClose = () => {
        this.setState({showModal: false});
    };

    handleShow = () => {
        this.setState({showModal: true});
    };

    handleDelete = (e) => {
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

    handleShiftDelete = (e) => {
        e.preventDefault(); // avoids page reload
        axios.delete(`${process.env.REACT_APP_API_URL}/admin/shift/${this.state.currentShift._id}`, {headers: {Authorization: `Bearer ${this.state.jwt}`}})
        .then((res) => {
            console.log(res);
            this.props.history.replace('/dashboard/events');
        }).catch((error) => {
            console.error(error);
            this.setState({error});
        });
    }

    handleCalendarSelect = (range) => {
        const handler = () => {
            let temp = range;
            this.setState({shiftFromCalendarRange: null});
            console.log(temp)
            this.setState({shiftFromCalendarRange: temp});
            window.removeEventListener('mouseup', handler);
          }
        window.addEventListener('mouseup', handler);
    }

    getShifts = (eventId) => {
        axios.get(`${process.env.REACT_APP_API_URL}/admin/event/shifts/${eventId}`, {headers: {Authorization: `Bearer ${this.state.jwt}`}})
        .then((res) => {
            console.log(res);
            this.setShifts(res.data.shifts);
            console.log("shifts")
            console.log(this.state.shifts)
            console.log(this.state.calendarEvents)
            this.setState({loadingShifts: false});
        }).catch((error) => {
            console.error(error);
            this.setState({error});
        });
    }

    getEvent = (eventId) => {
        if(this.props.location.state) {
            this.setState({event: this.props.location.state.event});
            this.setState({loadingEvent: false});
        } else {
            axios.get(`${process.env.REACT_APP_API_URL}/admin/event/${eventId}`, {headers: {Authorization: `Bearer ${this.state.jwt}`}})
            .then((res) => {
                console.log(res);
                this.setState({event: res.data.event})
                this.setState({loadingEvent: false});
            }).catch((error) => {
                console.error(error);
                this.setState({error});
            });
        }
        
    }

    showShiftDetails = (shiftEvent) => {
        console.log(shiftEvent);
        this.setState({currentShift: shiftEvent.shift});
    }

    componentDidMount() {
        const jwt = getJwt();
        if(!jwt) {
           // redirect
           this.props.history.replace('/login');
        }
        console.log("event: e" + this.state.event)
        this.getEvent(this.props.match.params.eventId);
        this.getShifts(this.props.match.params.eventId);
        this.setState({jwt});
    }


    render() {
        const { path, url } = this.props.match;
        if(this.state.loadingEvent) {
            return (
                <div className={DashboardStyle.loader}>
                <FontAwesomeIcon icon={faSpinner} />
                    Loading Event...
            </div>
            );
        } else {
            return(
                <Switch>
                        <Route exact path={path}>
                        <div>
                            <Row>
                                <Col md={8}>
                                { this.state.error &&
                                    <ErrorMessage errorMessage={this.state.error.message}></ErrorMessage>
                                }
                                    { this.state.loadingShifts ? 
                                        <div className={DashboardStyle.loader}>
                                            <FontAwesomeIcon icon={faSpinner} />
                                                Loading Event...
                                        </div>
                                        :
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

                                            selectable
                                            events={this.state.calendarEvents}
                                            startAccessor="start"
                                            endAccessor="end"
                                            defaultDate={moment().toDate()}
                                            defaultView={'week'}
                                            localizer={localizer}
                                            onSelectEvent={this.showShiftDetails}
                                            onSelecting={this.handleCalendarSelect}
                                        />
                                            </div>
                                        </Card.Body>
                                        </Card>
                                    
                                    }
                                    <Button>Edit</Button>
                                    <CreateShift event={this.state.event}></CreateShift>
                                    <Button onClick={this.handleDelete} variant="danger">Delete</Button>
                                    {this.state.shiftFromCalendarRange &&
                                    <CreateShift event={this.state.event} shiftFromCalendarRange={this.state.shiftFromCalendarRange}></CreateShift>
                                    }
                                </Col>
                                <Col md={4}>
                                    {this.state.currentShift &&
                                    <Card className={this.state.shiftDetailsVisibility} id={DashboardStyle.shiftDetails}>
                                    <Card.Header> Shift Details <Button className={DashboardStyle.displayRight} variant="warning" onClick={e => this.setState({currentShift:null})}> <FontAwesomeIcon icon={faWindowClose} /> Close</Button></Card.Header>
                                    <Card.Body>
                                        <Card.Title></Card.Title>
                                        <Card.Text>
                                        <p>Shift start Time: {moment(this.state.currentShift.startTime).format('lll')}</p>
                                        <p>Shift End Time: {moment(this.state.currentShift.endTime).format('lll')}</p>
                                        <p>Shift Duration: {moment.duration(moment(this.state.currentShift.endTime).diff(moment(this.state.currentShift.startTime))).hours()} Hour(s)</p>
                                        <p>Spots Taken: {this.state.currentShift.maxSpots}</p>
                                        <p>Spots Available: {this.state.currentShift.volunteers.length}</p>
                                        <p>Volunteers: 
                                        <Link to={{
                                                    pathname: `${url}/${this.state.currentShift._id}/volunteers`,
                                                    state: {
                                                        event: this.state.event,
                                                        shift: this.state.shift
                                                    }
                                                    }}>
                                                    <Button variant="primary" ><FontAwesomeIcon icon={faUsers} /> See Volunteers</Button>
                                        </Link>
                                            
                                        </p>
                                        </Card.Text>
                                        <Button variant="info" onClick={this.handleShiftEdit}> <FontAwesomeIcon icon={faEdit} /> Edit Shift Info</Button>
                                        
                                        <Button variant="danger" onClick={this.handleShiftDelete}><FontAwesomeIcon icon={faTrash} /> Delete Shift</Button>
                                    </Card.Body>
                                </Card>}
                                </Col>
                            </Row>
                        </div>
                           
                        </Route>
                        <Route path={`${path}/:shiftId/volunteers`} component={ShiftVolunteers}>
                        </Route>
                    </Switch>
                
                
            );
        }
        
    }
}

export default withRouter(VolunteerEvent);