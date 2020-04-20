import React, {Component} from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { Button, Row, Col, Card } from "react-bootstrap";
import axios from 'axios';
import moment from 'moment';
import ErrorMessage from './ErrorMessage.component';
import {getJwt} from './helpers/jwt';
import "../Login.css";

class VolunteerEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            eventName: '',
            event: null,
            jwt: null,
            error: null
        };
    }

    handleClose = () => {
        this.setState({showModal: false});
    };
    handleShow = () => {
        this.setState({showModal: true});
    };

    handleDelete = (e) => {
        console.log("submitted")
        e.preventDefault(); // avoids page reload
        axios.delete(`http://localhost:8000/api/admin/event/${this.state.event._id}`, {headers: {Authorization: `Bearer ${this.state.jwt}`}})
        .then((res) => {
            console.log(res);
            this.props.history.replace('/dashboard/events');
        }).catch((error) => {
            console.error(error);
            this.setState({error});
        });
    }

    componentDidMount() {
        const jwt = getJwt();
        if(!jwt) {
           // redirect
           this.props.history.replace('/login');
        }
        this.setState({jwt});
        console.log(this.props.location.state)
        const { eventName } = this.props.match.params;
        this.setState({eventName});
        const {event}  = this.props.location.state;
        console.log(event.event)
        console.log(event)
        console.log(this.props.location.state)
        this.setState({event});
    }

    render() {
        if(this.state.event) {
            return(
                <div>
                    <Row>
                        <Col md={8}>
                        { this.state.error &&
                            <ErrorMessage errorMessage={this.state.error.message}></ErrorMessage>
                        }
                            <Card>
                                <Card.Header>{this.state.eventName}</Card.Header>
                                <Card.Body>
                                    <Card.Title>{this.state.eventName}</Card.Title>
                                    <Card.Text>
                                     <p>Start Time: {moment(this.state.event.startTime).format('lll')}</p>
                                     <p>End Time: {moment(this.state.event.endTime).format('lll')}</p>
                                     <p>Location: {this.state.event.location}</p>
                                     <p>Volunteers: {this.state.event.volunteers.length}</p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                            <Button>Edit</Button>
                            <Button onClick={this.handleDelete} variant="danger">Delete</Button>
                        </Col>
                        <Col md={4}>
                        </Col>
                    </Row>
                </div>
                
            );
            
        }
        return (
            <h6>Event not found</h6>
        );
    }
}

export default withRouter(VolunteerEvent);