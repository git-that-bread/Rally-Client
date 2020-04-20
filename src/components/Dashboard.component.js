import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Container, Card, Table, Toast } from "react-bootstrap";
import { Switch, Route, Link } from 'react-router-dom';
import Volunteers from './Volunteers.component';
import Events from './Events.component';
import DashboardNav from './DashboardNav.component';
import { UserContext } from './UserContext';
import Authenticated from './Authenticated.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import DashboardStyle from './Dashboard.module.css';


class Dashboard extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);

        this.state = {
            user: undefined 
        };
    }

    componentDidMount() {
        //It will get the data from context, and put it into the state.
        this.setState({ user: this.context.user });
    }

    render() {
        const { path, url } = this.props.match;
        // if(!this.state.user) {
        //     console.log("Not authenticated")
        //     return(
        //         <Authenticated/>
        //     );
        // }
        return(
            
            <div className={DashboardStyle.wrapper}>
            
                <Container fluid>
                    <Row>
                        <Col xs={3} className={DashboardStyle.sidebar} id={DashboardStyle.sidebarWrapper}>      
                            <DashboardNav user={this.state.user}/>
                        </Col>
                        <Col  xs={9} className={DashboardStyle.sidebar} id={DashboardStyle.pageContentWrapper}>
                        <Row className={DashboardStyle.dashboardTitleWrapper}>
                         <h3 className={DashboardStyle.dashboardTitle}>Habitat for Humanity Dashboard</h3>
                        </Row>
                            <Switch>
                                <Route exact path={path}>
                                    <Row>
                                    <Col md={9}>
                                    <Card>
                                    <Card.Header>
                                        <Card.Title as='h5'>Upcoming Events</Card.Title>
                                    </Card.Header>
                                    <Card.Body>
                                        <Table responsive hover>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    <th>Date</th>
                                                    <th>Volunteers</th>
                                                    <th>Shifts</th>
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
                                                    <td>
                                                        <h6>14</h6>
                                                    </td>
                                                    <td>
                                                        <h6>22/30</h6>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <Link to={`${path}/cleanup`}>
                                                            <h6 >Mass Clean up</h6>
                                                        </Link>
                                                        
                                                    </td>
                                                    <td>
                                                        <h6>June 14, 2020</h6>
                                                    </td>
                                                    <td>
                                                        <h6>18</h6>
                                                    </td>
                                                    <td>
                                                        <h6>23/34</h6>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <Link to={`${path}/cleanup`}>
                                                            <h6 > Graffiti removal</h6>
                                                        </Link>
                                                        
                                                    </td>
                                                    <td>
                                                        <h6>March 05, 2020</h6>
                                                    </td>
                                                    <td>
                                                        <h6>4</h6>
                                                    </td>
                                                    <td>
                                                        <h6>7/20</h6>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                                    
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