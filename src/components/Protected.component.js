import React, {Component} from 'react';
import axios from 'axios';
import {getJwt} from './helpers/jwt';
// This component will check that a user is logged in

class Protected extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                <h1>Protected Route</h1>
            </div>
        );
        
    }
}

export default Protected;