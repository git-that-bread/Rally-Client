import React, { useContext } from 'react';
import { Alert } from "react-bootstrap";
import { getJwt } from './helpers/jwt';
import { useHistory } from 'react-router-dom';
import { UserContext } from './UserContext';
import "../Login.css";

const Logout = () => {
    const userContext = useContext(UserContext);
    const history = useHistory();
    const jwt = getJwt();
    if(!jwt) {
        // redirect
        setTimeout(() => { 
            history.replace('/');
        }, 5000)
        return(
            <div >
                <Alert variant="danger">
                    <p>No user is logged in</p>
                    <p>Redirecting to home page...</p>
                </Alert>
            </div>
        );
    }
    localStorage.removeItem('user-jwt');
    
    userContext.setUser(null)


    
    setTimeout(() => { 
        history.replace('/');
    }, 5000)

    return(
        <div >
            <Alert variant="success">
                <p>Successfully logged out!</p>
                <p>Redirecting to home page...</p>
            </Alert>
        </div>
    );
}

export default Logout;