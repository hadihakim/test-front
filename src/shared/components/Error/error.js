import React from "react";

import './error.css';

const ErrorComponent = props => {
     return (
        <div className="error-component">
            <h1>{props.message}</h1>
        </div>
     );
}


export default ErrorComponent