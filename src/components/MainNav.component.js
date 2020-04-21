
import React, { Component } from 'react';
import { Nav, Navbar, NavDropdown} from "react-bootstrap";
import { Link } from 'react-router-dom';
import IndexStyle from '../index.module.css';
import { UserContext } from './UserContext';

class MainNav extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false
        };
    }

    componentDidMount() {
        if(this.context.user) {
            this.setState({loggedIn: true});
        }
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
                    { !this.state.loggedIn &&
                    <Nav.Link as={Link} to="/" >Create an Organization Account</Nav.Link>
                    }
                </Nav>
                <Nav className="ml-auto nav-login">
                     <Nav.Link as={Link} to="/login" >Login</Nav.Link>
                     <NavDropdown title="Signup" id="basic-nav-dropdown">
                     <NavDropdown.Item as={Link} to="/signupOrganization" >Organization</NavDropdown.Item>
                     <NavDropdown.Item as={Link} to="/signupVolunteer" >Volunteer</NavDropdown.Item>
                     </NavDropdown>
                 </Nav>
                </Navbar.Collapse>
                </Navbar>
               
            </div>
        );
    }
    
};

export default MainNav;
