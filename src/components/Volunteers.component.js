


import React, {Component} from 'react';
import { Row, Col, Card, Table, Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import '../index.css';

class Volunteers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: undefined,
            userType: undefined
        };
    }

    
    render() {
        return(
            <div>
                <Row>
                    <Col className="lg=12 col-12 md=4">
                    <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Members</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Name</th>
                                            <th>Event</th>
                                            <th>Shift</th>
                                            <th>Date</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><FontAwesomeIcon icon={faUser} /></td>
                                            <td>
                                                <h6 className="mb-1">Grant Echeverria</h6>
                                            </td>
                                            <td>
                                                <h6 className="mb-1">Event Name</h6>
                                            </td>
                                            <td>
                                                <h6 className="mb-1">Shift</h6>
                                            </td>
                                            <td>
                                                <h6 className="text-muted"> 11 MAY 12:56 </h6>
                                            </td>
                                            <td><Button variant="success">Approve</Button>{' '}  <Button variant="danger">Reject</Button>{' '}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
        
    }
}

export default Volunteers;
               