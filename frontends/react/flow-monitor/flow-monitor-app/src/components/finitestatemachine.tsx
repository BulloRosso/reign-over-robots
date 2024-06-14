import * as React from 'react';
import MermaidDiagram from './mermaidDiagram.js';
import example from "./exampleMermaidData.js";

const StateOverview = () => {
    
    return (
        <div>
            <p className ="info-text">
                <b>The engine's internal way to keep track what to do next</b>
                <br></br>
            These are the possible states and transitions as defined in the agora YAML file. Waiting is a crucial state, 
            as it provides the hook for having a human in the loop. 
            </p>
            <MermaidDiagram chart={example} />
            
        </div>
    );
}

export default StateOverview;