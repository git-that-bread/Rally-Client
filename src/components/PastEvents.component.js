


import React, {Component} from 'react';
import {Link, withRouter } from 'react-router-dom';
import { Card, Table} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {UserContext} from './UserContext';
import DashboardStyle from './Dashboard.module.css';
import axios from 'axios';


class PastEvents extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);

        this.state = {
            events: props.events,
            volunteerShifts: null,
            done: false,
            error: null
        };
    }

    componentDidMount() {
        // get # of pending shift verifications
        axios.get(`${process.env.REACT_APP_API_URL}/admin/volunteerShifts/${this.context.user.underlyingUser.organization}`)
        .then((res) => {
            console.log("getting volunteer shifts: ", res);
            this.setState({volunteerShifts: res.data.volunteerShifts});
            this.setState({done: true});
        }).catch((error) => {
            console.error(error);
            this.setState(error);
        });
    }
    
    render() {
        const { path } = this.props.match;
        if(!this.state.done) {
            return(

                <div className={DashboardStyle.loader}>
                    <FontAwesomeIcon icon={faSpinner} />
                    Loading Events...
                </div>

            )

        } else {

            let rows = [];
        
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
                    <td>
                        <h6>{this.state.volunteerShifts.length}</h6>
                    </td>
                </tr>);
              }
              
        } 
        return(
            <Card className={DashboardStyle.events} id={DashboardStyle.pastEvents}>
                <Card.Header>
                    <Card.Title as='h5'>Past Events</Card.Title>
                </Card.Header>

                <Card.Body className='px-0 py-2'>
                    {this.state.events.length > 0 ?
                                <Table responsive hover>
                                    <thead>
                                        <tr key="events-table-heading">
                                            <th>Name</th>
                                            <th>Date</th>
                                            <th>Volunteers</th>
                                            <th>Unverified Shifts</th>
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
}

export default withRouter(PastEvents);
               