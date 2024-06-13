import React, { useState } from 'react';

const AgentExecutorBackend = () => {

    const [data, setData] = useState([]);
  
    const loadSession = async (agentName: string, fncUpdateSession) => {
                
        const response = await fetch('http://localhost:8078/heraklion/xenos');
        const result = await response.json();
        setData(result);
       
        fncUpdateSession(result);
    };

    const ping = async () => { 
        const response = await fetch('http://localhost:8078/ping');
    }
  
    return {
      data,
      loadSession,
      ping
    };
}
  
export default AgentExecutorBackend;