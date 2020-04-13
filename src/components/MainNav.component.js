
import React from 'react';
import { Nav, Navbar,NavDropdown} from "react-bootstrap";
import { Link } from 'react-router-dom';
import '../index.css';

const Home = () => {
    return (
        <div>
           <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">Volunteer App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/" >Home</Nav.Link>
                <Nav.Link as={Link} to="/" >Create an Organization Account</Nav.Link>
            </Nav>
            <Nav className="ml-auto nav-login">
                <NavDropdown title="Login" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/loginOrganization" >Organization</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/loginVolunteer" >Volunteer</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Signup" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/signupOrganization" >Organization</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/signupVolunteer" >Volunteer</NavDropdown.Item>
                </NavDropdown>
            </Nav>
            </Navbar.Collapse>
            </Navbar>
           
        </div>
    );
};

export default Home;
