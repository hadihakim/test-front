import React from "react";
import ReactDOM from 'react-dom';

import closeImg from '../../assets/close.png'

import './toast.css';

const Toast = props => {
    const content = ( 
        <div className={`toast-container ${props.type === 'success' && 'toast-success'} ${props.type === 'danger' && 'toast-danger'} 
        ${props.type === 'warning' && 'toast-warning'} ${props.type === 'info' && 'toast-info'}`}>
            <div className="toast-content">
                <p>{props.text}</p>
            </div>
            <div className="toast-cancel">
                <div>
                    <img alt="" src={closeImg} onClick={props.onCancel} />
                </div>
            </div>
        </div>
    );
    return ReactDOM.createPortal(content, document.getElementById('toast-hook'));
};

export default Toast;