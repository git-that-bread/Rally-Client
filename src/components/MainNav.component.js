
import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown} from "react-bootstrap";
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import IndexStyle from '../index.module.css';
import { UserContext } from './UserContext';
import DashboardStyle from './Dashboard.module.css';

class MainNav extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className={IndexStyle.mainNav} id={IndexStyle.mainNavWrapper}>
               <Navbar className={IndexStyle.mainNav} id={IndexStyle.mainNavbar} bg="light" expand="lg">
                <Navbar.Brand href="/"><img className={IndexStyle.logoBrand} src= {process.env.PUBLIC_URL + "/assets/logo-name.png"} ></img></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                <Nav className="mr-auto">
                    <Nav.Link className="mainNav" as={Link} to="/" >Home</Nav.Link>
                    { !this.context.user &&
                    <Nav.Link as={Link} to="/signupOrganization" >Create an Organization Account</Nav.Link>
                    }
                </Nav>
                
                <Nav className="ml-auto nav-login">
                    { !this.context.user &&
                    <div class="d-flex flex-row-reverse"> 
                        <NavDropdown title="Signup" id="basic-nav-dropdown">
                        <NavDropdown.Item as={Link} to="/signupOrganization" >Organization</NavDropdown.Item>
                        <NavDropdown.Item as={Link} to="/signupVolunteer" >Volunteer</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/login" >Login</Nav.Link>
                    </div>
                    }
                    {this.context.user &&
                        <Nav.Link as={Link} className={DashboardStyle.sidebarLink} to="/logout">
                            <FontAwesomeIcon icon={faSignOutAlt}/> Logout
                        </Nav.Link>
                    }
                </Nav>
                </Navbar.Collapse>
                </Navbar>
               
            </div>
        );
    }
    
};

export default MainNav;
