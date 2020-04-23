



import React, {Component} from 'react';
import { Row, Col, Card, Table, Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import DashboardStyle from './Dashboard.module.css';

class VolunteerRequests extends Component {
    constructor(props) {
        super(props);

        this.state = {
            volunteers: this.props.volunteers
        };
    }

    
    render() {
        return(
            <Card className={DashboardStyle.volunteerTable}>
                <Card.Header>
                    <Card.Title as='h5'>Pending Member Requests</Card.Title>
                </Card.Header>
                <Card.Body >
                    <Table responsive hover>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Approve</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.volunteers && this.state.volunteers.length > 0 ?
                                <tr>
                                <td><FontAwesomeIcon icon={faUser} /></td>
                                <td>
                                    <h6 className="mb-1"></h6>
                                </td>
                                <td>
                                    <h6 className="mb-1"></h6>
                                </td>
                                <td>
                                    <h6 className="mb-1"></h6>
                                </td>
                                <td><Button variant="success">Approve</Button>{' '}  <Button variant="danger">Reject</Button>{' '}</td>
                            </tr>
                            :
                            <h6>No members Found</h6>
                            }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            
        );
        
    }
}

export default VolunteerRequests;
               




