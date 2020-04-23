



import React, {Component} from 'react';
import { Row, Col, Card, Table, Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import DashboardStyle from './Dashboard.module.css';

class VolunteerMembers extends Component {
    constructor(props) {
        super(props);

        this.state = {
            volunteers: null,
            rows: null,
            loading: true
        };
    }

    setRows = () => {
        if(!this.state.volunteers) {return;}
        let rows = [];
        console.log(this.props)
        for(var i = 0; i < this.props.volunteers.length; i++) {
            let volunteer = this.props.volunteers[i];
            rows.push(
            <tr>
                <td><FontAwesomeIcon icon={faUser} /></td>
                <td>
                    <h6 className="mb-1">{volunteer.name}</h6>
                </td>
                <td>
                    <h6 className="mb-1">{volunteer.volunteerShifts.length}</h6>
                </td>
                <td>
                    <h6 className="mb-1">{volunteer.volunteerShifts.length}</h6>
                </td>
            </tr>)
        }
        this.setState({rows});
        this.setState({loading: false});
    }

    componentDidMount() {
        this.setState({volunteers: this.props.volunteers});
        this.setRows();
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
                                <th>Shifts</th>
                                <th>Unverified</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.volunteers && this.state.volunteers.length > 0 ?
                                this.state.rows
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
               




