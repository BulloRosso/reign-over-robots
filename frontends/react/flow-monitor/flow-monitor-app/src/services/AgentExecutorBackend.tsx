import React, { useState } from 'react';

const AgentExecutorBackend = () => {
    const [data, setData] = useState([]);
  
    const loadSession = async (agentName: string) => {
        console.log("called API fetcher");
        try {
          const response = await fetch('http://localhost:8078/heraklion/xenos');
          const result = await response.json();
          setData(result);
          console.log("Data fetched: ", result);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
  
    return {
      data,
      loadSession
    };
}
  
export default AgentExecutorBackend;