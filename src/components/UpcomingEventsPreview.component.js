



import React, {Component} from 'react';
import {Link, withRouter } from 'react-router-dom';
import { Row, Col, Card, Table} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import {UserContext} from './UserContext';
import DashboardStyle from './Dashboard.module.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';

const localizer = momentLocalizer(moment)

class UpcomingEventsPreview extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);

        this.state = {
            events: null,
            calendarEvents: null,
            loading: true,
            rows: [],
            error: null
        };
    }

    setUpcomingEvents(events) {
        let upcomingEvents = [];
        
        if(!this.state.loading) {
            for (const [index, event] of this.state.events.entries()) {
                const endTime = event.endTime;

                if(moment(endTime).isAfter(moment.now())) {
                    upcomingEvents.push(event);
                }
              }
        }
        this.setState({events: upcomingEvents});
    }
    
    setCalendarEvents() {
        let calendarEvents = [];
        for(var i = 0; i < this.state.events.length; i++) {
            const event = event[i];
            calendarEvents.push({
                id: event._id,
                title: event.name,
                start: new Date(event.startTime),
                end: new Date(event.endTime),
                event: event 
            });
        }
        this.setState({calendarEvents, calendarEvents});
    }

    componentDidMount() {
        console.log("Events")
        console.log(this.context.user);
        const user = this.context.user;
        if(user) {
            axios.get(`${process.env.REACT_APP_API_URL}/admin/events?orgId=${user.underlyingUser.organization}`)
            .then((res) => {
                console.log(res);
                this.setUpcomingEvents(res.data.Events);
                this.setCalendarEvents();
                this.setState({loading: false});
            }).catch((error) => {
                console.log(error);
                this.setState({error: error.response ? error.response.data.error : error});
            });
        }
    }
    

    
    render() {
        const { path, url } = this.props.match;
        if(this.state.events && this.state.events.length > 0) {
            for (const [index, event] of this.state.events.entries()) {
                console.log("event: ", event)
                this.state.rows.push(<tr key={index}>
                    <td>
                        <Link to={{
                            pathname: `${path}/${event._id}`,
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
        } 
         return(
                <div>
                    <Card className={DashboardStyle.events} id={DashboardStyle.upcomingEvents}>
                        <Card.Header>
                            <Card.Title as='h5'>Upcoming and Ongoing Events</Card.Title>
                        </Card.Header>
                        <Card.Body className='px-0 py-2'>
                        {this.loading ? 
                                    <div className={DashboardStyle.loader}>
                                    <FontAwesomeIcon icon={faSpinner} />
                                        Loading...
                                    </div>
                                    :
                                    <Table responsive hover>
                                            <thead>
                                                <tr key="events-table-heading">
                                                    <th>Name</th>
                                                    <th>Date</th>
                                                    <th>Volunteers</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.rows}
                                            </tbody>
                                            </Table>
                                    
                        }
                        
                            
                        </Card.Body>
                    </Card>
                    {this.state.calendarEvents &&
                        <Calendar 
                        events={this.state.calendarEvents}
                        startAccessor="start"
                        endAccessor="end"
                        defaultDate={moment().toDate()}
                        defaultView={'week'}
                        localizer={localizer}
                        style={{ height: 500 }}
                        min={new Date(2020, 10, 0, 6, 0, 0)}
                        max={new Date(2020, 10, 0, 22, 0, 0)} 
                    />
                    }
                    </div>
        )
    }
}

export default withRouter(UpcomingEventsPreview);
               