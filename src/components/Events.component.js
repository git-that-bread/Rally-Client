


import React, {Component} from 'react';
import { Switch, Route, Link, withRouter, useRouteMatch } from 'react-router-dom';
import { Row, Col, Card, Table} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import CreateEvent from './CreateEvent.component';
import Event from './Event.component';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

class Events extends Component {
    constructor(props) {
        super(props);

        const events = [
            {
                id: 0,
                title: 'All Day Event very long title',
                allDay: true,
                start: new Date(2020, 4, 0),
                end: new Date(2020, 4, 1),
            },
            {
                id: 1,
                title: 'Long Event',
                start: new Date(2020, 4, 7),
                end: new Date(2020, 4, 10),
            }
        ]
        this.state = {
            events: events
        };
    }

    

    
    render() {
        const { path, url } = this.props.match;
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
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <Link to={`${path}/cleanup`}>
                                                            <h6 >Clean up</h6>
                                                        </Link>
                                                        
                                                    </td>
                                                    <td>
                                                        <h6>April 14, 2020</h6>
                                                    </td>
                                                </tr>
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
                            <Calendar
                                events={this.state.events}
                                startAccessor="start"
                                endAccessor="end"
                                defaultDate={moment().toDate()}
                                localizer={localizer}
                            />
                        </Row>
                    </Route>
                    <Route path={`${path}/:eventName`}>
                        <Event />
                    </Route>
                </Switch>
                
            </div>
        );
        
    }
}

export default withRouter(Events);
               