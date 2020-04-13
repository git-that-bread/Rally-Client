import React, {Component} from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { Button, Row, Col, Card } from "react-bootstrap";
import axios from 'axios';
import "../Login.css";

class Event extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        };
    }

    handleClose = () => {
        this.setState({showModal: false});
    };
    handleShow = () => {
        this.setState({showModal: true});
    };

    handleSubmit = (e) => {
        console.log("submitted")
        e.preventDefault(); // avoids page reload
        axios.post('http://localhost:8000/api/auth/login', {
            username: this.state.username,
            password: this.state.password
        }).then((res) => {
            console.log(res);
            localStorage.setItem('user-jwt', res.data.token);
        })
    }

    render() {
        const { eventName } = this.props.match.params;
        return(
            <div>
                <Row>
                    <Col md={8}>
                        <Card>
                            <Card.Header>{eventName}</Card.Header>
                            <Card.Body>
                                <Card.Title>Event Information</Card.Title>
                                <Card.Text>
                                With supporting text below as a natural lead-in to additional content.
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Button>Edit</Button>
                        <Button variant="danger">Delete</Button>
                    </Col>
                    <Col md={4}>
                    </Col>
                </Row>
            </div>
            
        );
        
    }
}

export default withRouter(Event);