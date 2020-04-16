
import React from 'react';
import { Alert } from "react-bootstrap";
import '../index.css';

const ErrorMessage = (props) => {
    return(
        <Alert variant="danger" className="error-alert">
            <Alert.Heading>Error</Alert.Heading>
                <p>
                    {props.errorMessage} Please try again.
                </p>
        </Alert>
    )
}

export default ErrorMessage;

