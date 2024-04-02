import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useStrings } from '../../strings/stringsConfig';

import './whatsapp.css';

const WhatsAppIcon = props => {
    return (
        <div className="whatsapp-container">
            <a href={`https://wa.me/${props?.whatsapp || useStrings.ContactRestaurantDetails.whatsAppValue}`} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faWhatsapp} className="whatsapp-icon icon" />
                <div className="vibration">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </a>
        </div>
    );
}

export default WhatsAppIcon;
