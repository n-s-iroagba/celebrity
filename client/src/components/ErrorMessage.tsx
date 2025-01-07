import React from 'react';
import { Alert } from 'react-bootstrap';

const ErrorMessage:React.FC<{message:string}> = ({message})=>{
    return(
        <Alert variant='danger'>{message}</Alert>
    
    )
}
export default ErrorMessage