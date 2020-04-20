


import React, {Component} from 'react';
import { Switch, Route, Link, withRouter, useRouteMatch } from 'react-router-dom';
import { Row, Col, Card, Table} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import CreateEvent from './CreateEvent.component';
import VolunteerEvent from './VolunteerEvent.component';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import {UserContext} from './UserContext';


class Events extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);

        this.state = {
            events: [],
            error: null
        };
    }

    setEvents(events) {
        console.log("Setting events")
        console.log(events)
        this.setState({ events });
    }


    componentDidMount() {
        console.log("Events")
        console.log(this.context.user);
        const user = this.context.user;
        if(user) {
            axios.get(`${process.env.REACT_APP_API_URL}/admin/events?orgId=${user.underlyingUser.organization}`)
            .then((res) => {
                console.log(res);
                this.setEvents(res.data.Events);
                this.props.history.replace('/dashboard/events');
            }).catch((error) => {
                console.log(error);
                this.setState({error: error.response ? error.response.data.error : error});
            });
        }
    }
    

    
    render() {
        const { path, url } = this.props.match;
        let rows = [];
        
        if(this.state.events) {
            for (const event of this.state.events) {
                console.log("event: ", event)
                rows.push(<tr>
                    <td>
                        <Link to={{
                            pathname: `${path}/${event.eventName}`,
                            state: {
                                event
                            }
                            }}>
                            <h6 >{event.eventName}</h6>
                        </Link>
                        
                    </td>
                    <td>
                        <h6>{moment(event.startTime).format('lll')}</h6>
                    </td>
                    <td>
                        <h6>{event.volunteers.length}</h6>
                    </td>
                </tr>)
              }
              return(
                <div>
                    <Switch>
                        <Route exact path={path}>
                            <Row id="events-table-wrapper">
                                <Col md={8}>
                                    <Card className='Recent-Users'>
                                        <Card.Header>
                                            <Card.Title as='h5'>Upcoming Events</Card.Title>
                                        </Card.Header>
                                        <Card.Body className='px-0 py-2'>
                                            <Table responsive hover>
                                                <thead>
                                                    <tr>
                                                        <th>Name</th>
                                                        <th>Date</th>
                                                        <th>Volunteers</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {rows}
                                                </tbody>
                                            </Table>
                                        </Card.Body>
                                    </Card>
                                </Col>
    
                                <Col md={4}>
                                {/* Create new Event Button and Modal */}
                                    <CreateEvent></CreateEvent>
                                </Col>
                            </Row>
                            <Row id="calendar-wrapper">
                                {/* <Calendar
                                    events={this.state.events}
                                    startAccessor="start"
                                    endAccessor="end"
                                    defaultDate={moment().toDate()}
                                    localizer={localizer}
                                /> */}
                            </Row>
                        </Route>
                        <Route path={`${path}/:eventName`} component={VolunteerEvent}>
                        </Route>
                    </Switch>
                    
                </div>
            );
        } else {
            return (
                <div>
                    <h6>No events found</h6>
                </div>

            );
        }
        
        
    }
}

export default withRouter(Events);
               