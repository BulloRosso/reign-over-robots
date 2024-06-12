import * as React from 'react';
import { useState, useEffect } from 'react';
import ConnectedIcon from '@mui/icons-material/CheckCircle'
import DisconnectedIcon from '@mui/icons-material/ReportProblem'
import LLMIcon from '@mui/icons-material/SmartToyOutlined'
import AgentExecutorBackend from '../services/AgentExecutorBackend';
import LLMBackend from '../services/LLMBackend';

const ConnectivityInfo = () => {
  
    const backend = AgentExecutorBackend();
    const llmBackend = LLMBackend();
    const [connectivityState, setConnectivityState] = useState(false);
    const [llmState, setLlmState] = useState(false);

    useEffect(() => {
        // Ping the backend API to check connectivity
        const data =  backend.ping().then((data) =>  setConnectivityState(true)).catch((error) =>  setConnectivityState(false));
        const llm =  llmBackend.ping().then((data) =>  setLlmState(true)).catch((error) =>  setLlmState(false));

        const timer = setInterval(() => {
            console.log('Connectivity check runs every 4 seconds');
            const data =  backend.ping().then((data) =>  setConnectivityState(true)).catch((error) =>  setConnectivityState(false));
            const llm =  llmBackend.ping().then((data) =>  setLlmState(true)).catch((error) =>  setLlmState(false));
        }, 4000); 
      
        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(timer);
    }, []); // Empty dependency array ensures this runs only on mount and not on updates

    return (
        <div className="bottom-section">
        {connectivityState ? (
            <div className="bottom-segment">
                <ConnectedIcon className="connected-icon"  titleAccess=':8087' />
                <p>Agent executor</p>
            </div>
             
        ) : (
            <div className="bottom-segment">
                <DisconnectedIcon className="disconnected-icon"  titleAccess=':8087'  />
                <p>Agent executor</p>
            </div>
        )}
        {llmState ? (
            <div className="bottom-segment">
                <LLMIcon className="connected-icon"  titleAccess=':11434' />
                <p>Local Ollama</p>
            </div>
             
        ) : (
            <div className="bottom-segment">
                <LLMIcon className="disconnected-icon" titleAccess=':11434'  />
                <p>Local Ollama</p>
            </div>
        )}
        </div>
    );
}

export default ConnectivityInfo;