


import React, {Component} from 'react';
import {Link, withRouter } from 'react-router-dom';
import { Card, Table} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {UserContext} from './UserContext';
import DashboardStyle from './Dashboard.module.css';


class UpcomingEvents extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);

        this.state = {
            events: props.events,
            error: null
        };
    }
    
    render() {
        const { path } = this.props.match;
        let rows = [];
        console.log("upcoming events: ", this.state.events)
        
        if(this.state.events.length > 0) {
            for (const [index, event] of this.state.events.entries()) {
                console.log("event: ", event)
                rows.push(<tr key={index}>
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
            <Card className={DashboardStyle.events} id={DashboardStyle.upcomingEvents}>
                <Card.Header>
                    <Card.Title as='h5'>Upcoming and Ongoing Events</Card.Title>
                </Card.Header>
                <Card.Body className='px-0 py-2'>
                {this.state.events.length > 0 ?
                            <Table responsive hover>
                                <thead>
                                    <tr key="events-table-heading">
                                        <th>Name</th>
                                        <th>Date</th>
                                        <th>Volunteers</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {rows}
                                </tbody>
                             </Table>
                                 :
                                 <h6> No upcoming events found </h6>
                }
                    
                </Card.Body>
        </Card>
        );
    }
}

export default withRouter(UpcomingEvents);
               