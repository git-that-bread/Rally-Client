


import React, {Component} from 'react';
import { Switch, Route, Link, withRouter, useRouteMatch } from 'react-router-dom';
import { Row, Col, Card, Table} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import CreateEvent from './CreateEvent.component';
import VolunteerEvent from './VolunteerEvent.component';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import {UserContext} from './UserContext';
import UpcomingEvents from './UpcomingEvents.component';
import PastEvents from './PastEvents.component';
import DashboardStyle from './Dashboard.module.css';



class Events extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);

        this.state = {
            events: null,
            loading: true,
            error: null
        };
    }

    componentDidMount() {
        console.log("Events")
        console.log(this.context.user);
        const user = this.context.user;
        if(user) {
            axios.get(`${process.env.REACT_APP_API_URL}/admin/events?orgId=${user.underlyingUser.organization}`)
            .then((res) => {
                console.log(res);
                this.setState({events:res.data.Events});
                this.setState({loading: false});
            }).catch((error) => {
                console.log(error);
                this.setState({error: error.response ? error.response.data.error : error});
            });
        }
    }
    

    
    render() {
        const { path, url } = this.props.match;
        let upcomingEvents = [];
        let pastEvents = [];
        
        if(!this.state.loading) {
            for (const [index, event] of this.state.events.entries()) {
                const endTime = event.endTime;

                if(moment(endTime).isBefore(moment.now())) {
                    pastEvents.push(event);
                } else {
                    upcomingEvents.push(event);
                }
              }

              return(
                <div>
                    <Switch>
                        <Route exact path={path}>
                            <Row id="events-wrapper">
                                <Col className={DashboardStyle.events} md={9} id={DashboardStyle.eventsTableWrapper}>
                                    <Row className={DashboardStyle.events} id={DashboardStyle.upcomingEventsTableWrapper}>
                                        <UpcomingEvents events={upcomingEvents}></UpcomingEvents>
                                    </Row>

                                    <Row className={DashboardStyle.events} id={DashboardStyle.pastEventsTableWrapper}>
                                        <PastEvents events={pastEvents}></PastEvents>
                                    </Row>

                                </Col>

                                <Col md={3}>
                                    {/* Create new Event Button and Modal */}
                                    <CreateEvent></CreateEvent>
                                </Col>
                            
                            </Row>
                           
                        </Route>
                        <Route path={`${path}/:eventId`} component={VolunteerEvent}>
                        </Route>
                    </Switch>
                    
                </div>
            );
        } else {
            return(

                <div className={DashboardStyle.loader}>
                    <FontAwesomeIcon icon={faSpinner} />
                    Loading...
                </div>

            )
        }
        
        
    }
}

export default withRouter(Events);
               