import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Container, Card, Table, Toast } from "react-bootstrap";
import { Switch, Route, Link } from 'react-router-dom';
import Volunteers from './Volunteers.component';
import Events from './Events.component';
import DashboardNav from './DashboardNav.component';
import { UserContext } from './UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faSpinner } from '@fortawesome/free-solid-svg-icons';
import DashboardStyle from './Dashboard.module.css';
import UpcomingEventsPreviewComponent from './UpcomingEventsPreview.component';


class Dashboard extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);

        this.state = {
            user: undefined 
        };
    }

    componentWillMount() {
        //It will get the data from context, and put it into the state.
        this.setState({ user: this.context.user });
    }

    render() {
        const { path, url } = this.props.match;
        if(!this.state.user) {
            return(
                <div className={DashboardStyle.loader}>
                    <FontAwesomeIcon icon={faSpinner} />
                    Loading...
                </div>
            );
        }
        return(
            
            <div className={DashboardStyle.wrapper}>
            
                <Container fluid>
                    <Row className={DashboardStyle.dashboard} id={DashboardStyle.dashboardWrapper}>
                        <Col xs={3} className={DashboardStyle.sidebar} id={DashboardStyle.sidebarWrapper}>      
                            <DashboardNav user={this.state.user}/>
                        </Col>
                        <Col  xs={9} className={DashboardStyle.mainContentWrapper}>
                        <Row className={DashboardStyle.dashboardTitleWrapper}>
                         <h3 className={DashboardStyle.dashboardTitle}> {this.state.user.underlyingUser.name} </h3>
                        </Row>
                            <Switch>
                                <Route exact path={path}>
                                    <Row className={DashboardStyle.dashboard} id={DashboardStyle.mainContent}>
                                    <Col md={9}>
                                       <UpcomingEventsPreviewComponent></UpcomingEventsPreviewComponent>
                                    
                                    </Col>

                                    <Col md={3}>
                                    <Card>
                                        <Card.Header>
                                            <Card.Title>Recent Notifications <FontAwesomeIcon icon={faBell} /> </Card.Title>
                                        </Card.Header>
                                        <Card.Body>
                                        <Toast>
                                        <Toast.Header>
                                        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                                        <strong className="mr-auto">New Shift Withdrawal</strong>
                                        <small>just now</small>
                                        </Toast.Header>
                                        <Toast.Body>Member Clara Jones withrew from Alachua Clean up</Toast.Body>
                                    </Toast>
                                    <Toast>
                                        <Toast.Header>
                                        <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                                        <strong className="mr-auto">New Member request</strong>
                                        <small>2 seconds ago</small>
                                        </Toast.Header>
                                        <Toast.Body>Brian Gomez requests to join</Toast.Body>
                                    </Toast>
                                        </Card.Body>

                                    </Card>
                                    
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