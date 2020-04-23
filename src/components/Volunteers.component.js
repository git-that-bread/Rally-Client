


import React, {Component} from 'react';
import { Row, Col, Card, Table, Button} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import VolunteerMembers from './VolunteerMembers.component';
import VolunteerRequests from './VolunteerRequests.component';
import {UserContext} from './UserContext';
import axios from 'axios';
import DashboardStyle from './Dashboard.module.css';

class Volunteers extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            user: null
        };
    }

    getVolunteers() {
        axios.get(`${process.env.REACT_APP_API_URL}/admin/volunteers/${this.context.user.underlyingUser.organization}`)
        .then((res) => {
            console.log(res);
            this.setState({volunteers:res.data.Volunteers});
            this.setState({loadingVolunteers: false});
        }).catch((error) => {
            console.log(error);
            this.setState({error: error.response ? error.response.data.error : error});
        });
    }

    getPendingVolunteers() {
        axios.get(`${process.env.REACT_APP_API_URL}/admin/volunteers/pending/${this.context.user.underlyingUser.organization}`)
        .then((res) => {
            console.log(res);
            this.setState({pendingVolunteers:res.data.Volunteers});
            this.setState({loadingPendingVolunteers: false});
        }).catch((error) => {
            console.log(error);
            this.setState({error: error.response ? error.response.data.error : error});
        });
    }

    componentDidMount() {
        this.setState({user: this.context.user});
        this.getVolunteers();
        this.getPendingVolunteers();

    }
    
    
    render() {
        return(
            <div>
                <Row>
                    <Col md={10}>
                        <Row>
                            {this.loadingVolunteers ? 
                                <div className={DashboardStyle.loader}>
                                <FontAwesomeIcon icon={faSpinner} />
                                    Loading members...
                                </div>
                                :
                                <VolunteerMembers volunteers={this.state.volunteers}></VolunteerMembers>
                            }
                        </Row>
                        <Row>
                        {this.loadingPendingVolunteers ? 
                                <div className={DashboardStyle.loader}>
                                <FontAwesomeIcon icon={faSpinner} />
                                    Loading pending requests...
                                </div>
                                :
                                <VolunteerRequests volunteers={this.state.pendingVolunteers}></VolunteerRequests>
                            }
                            
                        </Row>
                    </Col>
                    <Col md={2}>
                    </Col>
                </Row>
                
                
            </div>
        );
    }
}

export default Volunteers;
               