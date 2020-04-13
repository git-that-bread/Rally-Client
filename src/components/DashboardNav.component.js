

import React, {Component} from 'react';
import { Row, Col, Card, Table, Button, Nav, Navbar,NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faCalendarAlt, faUserClock } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

// This component will check that a user is logged in

class DashboardNav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toggle: false
        };
    }

    
    render() {
        return(
            <div>

                <Nav className="col-md-12 d-none d-md-block sidebar"
                activeKey="/dashboard">
                    <div className="sidebar-sticky"></div>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/dashboard"><FontAwesomeIcon icon={faHome} />   Dashboard</Nav.Link>
                    </Nav.Item>
                    <hr className="divider"></hr>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/dashboard/volunteers"><FontAwesomeIcon icon={faUsers} />   Manage Members</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/dashboard/events"><FontAwesomeIcon icon={faCalendarAlt} />   Manage Events</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link as={Link} to="/dashboard/shifts"><FontAwesomeIcon icon={faUserClock} />   Manage Shifts</Nav.Link>
                    </Nav.Item>
                </Nav>
                
               
                
            </div>
        );
        
    }
}

export default DashboardNav;

 