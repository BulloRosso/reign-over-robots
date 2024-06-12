import * as React from 'react';
import { useState, useEffect } from 'react';
import ConnectedIcon from '@mui/icons-material/CheckCircle'
import DisconnectedIcon from '@mui/icons-material/ReportProblem'
import AgentExecutorBackend from '../services/AgentExecutorBackend';

const ConnectivityInfo = () => {
  
    const backend = AgentExecutorBackend();
    const [connectivityState, setConnectivityState] = useState(false);

    useEffect(() => {
        // Ping the backend API to check connectivity
        const data =  backend.ping().then((data) =>  setConnectivityState(true)).catch((error) =>  setConnectivityState(false));

        const timer = setInterval(() => {
            console.log('Connectivity check runs every 4 seconds');
            const data =  backend.ping().then((data) =>  setConnectivityState(true)).catch((error) =>  setConnectivityState(false));
        }, 4000); 
      
        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(timer);
    }, []); // Empty dependency array ensures this runs only on mount and not on updates

    return (
        <div className="bottom-section">
        {connectivityState ? (
            <span>
                <ConnectedIcon className="connected-icon"  />
                <p>Backend API  of agent executor service connected.</p>
            </span>
             
        ) : (
            <span>
                <DisconnectedIcon className="disconnected-icon"  />
                <p>Backend API of agent executor service not available/reachable!</p>
            </span>
        )}
        </div>
    );
}

export default ConnectivityInfo;