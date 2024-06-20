import * as React from 'react';
import { useContext } from 'react';

// own Components
import { AgentExecutorSessionContext } from '../contexts/agentExecutorContext';

const LongTermMemory = () => {
 
  const { agentExecutorSession, incr } = useContext(AgentExecutorSessionContext);
    
  return (
    <div>
        <p className ="info-text">
            <b>Domain knowledge specific to this Agora</b><br/>
            Stored as a knowledge graph the engine can query for information when creating the "memory" section of the next prompt.
        </p>
        <p className='info-box'>
            No Neo4j instance configured / Long-term memory disabled.
        </p>
    </div>
    );
}

export default LongTermMemory;