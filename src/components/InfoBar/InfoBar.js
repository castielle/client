import React from 'react';

import './InfoBar.css';
// import onlineIcon from '../../icons/dot-icon.png';


const InfoBar = ({ room, time }) => (
    <div className="infoBar">
        <div className="leftInnerContainer">
            {/*<img className="onlineIcon" src={onlineIcon} alt="online icon" />*/}
            <p>Room {room}</p>

        </div>
        <div className="rightInnerContainer">
            <p>{Date().toLocaleString().replace(/\..+/, '')}</p>
        </div>
    </div>
);

export default InfoBar;