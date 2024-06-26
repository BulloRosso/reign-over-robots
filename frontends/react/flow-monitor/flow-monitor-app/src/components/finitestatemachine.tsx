import * as React from 'react';
import { useContext } from 'react';

import MermaidDiagram from './mermaidDiagram.js';
import example from "./exampleMermaidData.js";

// own Components
import { AgentExecutorSessionContext } from '../contexts/agentExecutorContext';  

const StateOverview = () => {
    
    const { agentExecutorSession, incr, updateSession } = useContext(AgentExecutorSessionContext);

    const currentStep = agentExecutorSession.session?.currentStep ? agentExecutorSession.session?.currentStep : -1;

    // mapping required because one index in the conversation log corresponds to two steps in the flow (prompt and response)
    const mapToOriginal = (idx) => {
        if (idx == 1 || idx == -1) 
          return 0;
  
        if (idx % 2 === 0)  
          return idx / 2;
       
        return (idx -1)/2;
    }
console.log("currentStep: ", currentStep, mapToOriginal(currentStep));
    const currentState = currentStep > 0 ? agentExecutorSession.session.conversationLog[mapToOriginal(currentStep)].state.onExit : "None";

    const updExample = example.replace("class Waiting active", "class " + currentState + " active");

    return (
        <div>
            <p className ="info-text"> 
                <b>The engine's internal way to keep track what to do next</b>
                <br></br>
            These are the possible states and transitions as defined in the agora YAML file. Waiting is a crucial state, 
            as it provides the hook for having a human in the loop. 
            </p>
            <MermaidDiagram chart={updExample} />
            
        </div>
    );
}

export default StateOverview;