

import React from 'react';
import { Nav, Navbar, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faCalendarAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

// This component will check that a user is logged in

const DashboardNav = (props) =>  {
    return(
        <div>
            <Nav className="col-md-12 d-none d-md-block sidebar"
            activeKey="/dashboard">
            <div>
                {/* [ORG LOGO IF PROVIDED] */}
            </div>
                <Alert variant="info" className="welcome-alert">
                        <p>
                            {props.user.username}
                        </p>
                </Alert>
                
                <Nav.Item>
                    <Nav.Link as={Link} to="/dashboard"><FontAwesomeIcon icon={faHome} />   Dashboard</Nav.Link>
                </Nav.Item>
                <hr className="divider"></hr>
                {
                    props.user.userType == 'admin'
                    ?  
                    [
                        <Nav.Item>
                           <Nav.Link as={Link} to="/dashboard/volunteers"><FontAwesomeIcon icon={faUsers} />   Manage Members</Nav.Link>
                       </Nav.Item>
                    ]
                    :
                    [ 
                      <Nav.Item>
                        <Nav.Link as={Link} to="/dashboard/organizations"><FontAwesomeIcon icon={faCalendarAlt} />   Manage Organizations</Nav.Link>
                      </Nav.Item>
                    ]
                }
                <Nav.Item>
                    <Nav.Link as={Link} to="/dashboard/events"><FontAwesomeIcon icon={faCalendarAlt} />   Manage Events</Nav.Link>
                </Nav.Item>
               
            </Nav>
            
            <Nav>
                <Nav.Item className="logout">
                    <Nav.Link as={Link} to="/logout"><FontAwesomeIcon icon={faSignOutAlt} /> Log Out </Nav.Link>
                </Nav.Item>
            </Nav>
            
        </div>
    );
}

export default DashboardNav;

 