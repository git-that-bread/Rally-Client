
import React from 'react';
import { Alert } from "react-bootstrap";
import IndexStyle from '../Index.module.css';

const ErrorMessage = (props) => {
    return(
        <Alert variant="danger" className={IndexStyle.errorAlert}>
            <Alert.Heading>Error</Alert.Heading>
                <p>
                    {props.errorMessage} Please try again.
                </p>
        </Alert>
    )
}

export default ErrorMessage;

