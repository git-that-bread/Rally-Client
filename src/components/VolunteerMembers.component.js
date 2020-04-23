



import React, {Component} from 'react';
import { Row, Col, Card, Table, Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import DashboardStyle from './Dashboard.module.css';

class VolunteerMembers extends Component {
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
                    <Card.Title as='h5'>Members</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Table responsive hover>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Events</th>
                                <th>Shifts</th>
                                <th>Unverified</th>
                                <th></th>
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
                                <td>
                                    <h6 className="text-muted">  </h6>
                                </td>
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

export default VolunteerMembers;
               




