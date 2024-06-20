import * as React from 'react';
import Box from '@mui/material/Box';
import logo from '../assets/agora-logo.jpg';

const WelcomeInfo = () => {
    return (
        <div className='welcome-box' >
            <img src={logo} width="250px" style={{float:"left"}} />
            <p>
            This frontend allows you to monitor the <b>flow of data between agents</b> when entering an agora.
            </p>
            <p>
                The agent executor service will step through each of the interactions between the chosen agents. 
            </p>
            <p>
            Click "Run Agent" to start the simulation!
            </p>
        </div>
    )
}

export default WelcomeInfo;