


import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Row, Col, Card, Table, Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import moment from 'moment';
import DashboardStyle from './Dashboard.module.css';
import {getJwt} from './helpers/jwt';

class ShiftVolunteers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shift: null,
            event: null,
            volunteers: null,
            loading: true
        };
    }

    

    getEvent(eventId) {
        axios.get(`${process.env.REACT_APP_API_URL}/admin/event/${eventId}`, {headers: {Authorization: `Bearer ${this.state.jwt}`}})
            .then((res) => {
                console.log(res);
                this.setState({event: res.data.event})
                this.setState({loadingEvent: false});
            }).catch((error) => {
                console.error(error);
                this.setState({error});
            });
    }

    getShift(shiftId) {
        axios.get(`${process.env.REACT_APP_API_URL}/admin/shiftInfo/${shiftId}`, {headers: {Authorization: `Bearer ${this.state.jwt}`}})
            .then((res) => {
                console.log(res);
                this.setState({event: res.data.data.shift})
                this.setState({loadingShift: false});
            }).catch((error) => {
                console.error(error);
                this.setState({error});
            });

    }

    handleApprove(volunteerId) {
        axios.get(`${process.env.REACT_APP_API_URL}/admin/volunteers/pending`, {headers: {Authorization: `Bearer ${this.state.jwt}`}})
            .then((res) => {
                console.log(res);
                this.setState({event: res.data.data.shift})
                this.setState({loadingShift: false});
            }).catch((error) => {
                console.error(error);
                this.setState({error});
        });
    }

    handleReject(volunteerId) {
        // axios.get(`${process.env.REACT_APP_API_URL}/admin/shiftInfo/${shiftId}`, {headers: {Authorization: `Bearer ${this.state.jwt}`}})
        //     .then((res) => {
        //         console.log(res);
        //         this.setState({event: res.data.data.shift})
        //         this.setState({loadingShift: false});
        //     }).catch((error) => {
        //         console.error(error);
        //         this.setState({error});
        //     });

    }

    setRows() {
        let rows = [];

        for(var i = 0; i < this.state.volunteers; i++) {
            let volunteer = this.state.volunteers[i];
            rows.push(<tr>
                <td><FontAwesomeIcon icon={faUser} /></td>
                <td>
                    <h6 className="mb-1">{volunteer.name}</h6>
                </td>
                <td>
                    <h6 className="text-muted"> {moment(this.state.shift.created_at).format('lll')} </h6>
                </td>
                <td><Button onClick={this.handleApprove(volunteer._id)} variant="success">Approve</Button>{' '}  <Button onClick={this.handleReject(volunteer._id)} variant="danger">Reject</Button>{' '}</td>
            </tr>)
        }
    }

    getVolunteers(shiftId) {
        axios.get(`${process.env.REACT_APP_API_URL}/admin/shift/${shiftId}`, {headers: {Authorization: `Bearer ${this.state.jwt}`}})
            .then((res) => {
                console.log(res);
                this.setState({volunteers: res.data.data.volList});
                this.setRows();
                this.setState({loadingVolunteers: false});
            }).catch((error) => {
                console.error(error);
                this.setState({error});
            });
    }


    compointDidMount() {
        const jwt = getJwt();
        if(!jwt) {
           // redirect
           this.props.history.replace('/login');
        }
        console.log("State")
        console.log(this.props.location.state)
        if(this.props.location.state && this.props.location.state.event && this.props.location.shift) {
            this.setState({event: this.props.location.state.event});
            this.setState({shift: this.props.location.state.shift});
        } else {
            this.getEvent(this.props.match.params.eventId);
            this.getShift(this.props.match.params.shiftId);
        }
        this.getVolunteers(this.props.match.params.shiftId);
    }

    
    render() {
            return(
                <div>
                    <Row>
                        <Col className="lg=12 col-12 md=4">
                        <Card className='volunteers'>
                                <Card.Header>
                                    <Card.Title as='h5'>Volunteers</Card.Title>
                                </Card.Header>
                                <Card.Body className='px-0 py-2'>
                                { this.state.loadingVolunteers ? 
                                         <div className={DashboardStyle.loader}>
                                            <FontAwesomeIcon icon={faSpinner} />
                                            Loading Events...
                                        </div>

                                    :
                                    <Table responsive hover>
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Name</th>
                                                <th>Date</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.rows}
                                        </tbody>
                                    </Table>
                            
                                }
                                    
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </div>
            );
        
    }
}

export default withRouter(ShiftVolunteers);
               