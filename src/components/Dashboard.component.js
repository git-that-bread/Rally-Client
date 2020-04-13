import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Container, Breadcrumb } from "react-bootstrap";
import { Switch, Route } from 'react-router-dom';
import ShiftRequestsTable from './ShiftRequestsTable.component';
import Volunteers from './Volunteers.component';
import Events from './Events.component';
import DashboardNav from './DashboardNav.component';
import { Link } from 'react-router-dom';
import './Dashboard.css';


class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: undefined,
            userType: undefined
        };
    }

    
    render() {
        const { path, url } = this.props.match;
        return(
            
            <div className="wrapper">
            
                <Container fluid>
                    <Row>
                        <Col xs={2} id="sidebar-wrapper">      
                            <DashboardNav/>
                        </Col>
                        <Col  xs={10} id="page-content-wrapper">
                            <Switch>
                                <Route exact path={path}>
                                    <Row>
                                    <Col md={8}>
                                        <Row id="upcoming-events-wrapper">
                                        upcoming-events-wrapper
                                        </Row>
                                        <Row>
                                            <Col id="shifts-requests-wrapper">
                                            shifts-requests-wrapper
                                            </Col>
                                            <Col id="member-approval-requests-wrapper">
                                            member-approval-requests-wrapper
                                            </Col>

                                        </Row>
                                    </Col>
                                    <Col md={4}>
                                        <Row id="recent-notifs">
                                        recent-notifs
                                        </Row>
                                        <Row>
                                            Extra stuff
                                        </Row>
                                        <Row>
                                            Extra stuff
                                        </Row>
                                    </Col>
                                </Row>
                                
                                </Route>
                                <Route path={`${path}/events`}>
                                    <Events></Events>
                                </Route>

                                <Route path={`${path}/volunteers`}>
                                    <Volunteers></Volunteers>
                                </Route>
                                
                            </Switch>
                          
                        </Col> 
                    </Row>
            </Container>

           
            </div>
        );
        
    }
}

export default withRouter(Dashboard);