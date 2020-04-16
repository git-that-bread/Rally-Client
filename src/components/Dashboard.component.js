import React, {Component} from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Container, Breadcrumb } from "react-bootstrap";
import { Switch, Route } from 'react-router-dom';
import Volunteers from './Volunteers.component';
import Events from './Events.component';
import DashboardNav from './DashboardNav.component';
import './Dashboard.css';
import { UserContext } from './UserContext';
import Authenticated from './Authenticated.component';


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
        console.log("State dashboard")
        console.log(this.context)
        this.setState({ user: this.context.user });
        
    }

    render() {
        const { path, url } = this.props.match;
        if(!this.state.user) {
            return(
                <Authenticated/>
            );
        }
        return(
            
            <div className="wrapper">
            
                <Container fluid>
                    <Row>
                        <Col xs={2} id="sidebar-wrapper">      
                            <DashboardNav user={this.state.user}/>
                        </Col>
                        <Col  xs={10} id="page-content-wrapper">
                            <Switch>
                                <Route exact path={path}>
                                    <Row>
                                    <Col md={8}>
                                        <Row id="upcoming-events-wrapper">
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