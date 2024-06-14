import * as React from 'react';
import MermaidDiagram from './mermaidDiagram.js';
import example from "./exampleMermaidData.js";

const StateOverview = () => {
    
    return (
        <div>
            <MermaidDiagram chart={example} />
            <p className ="info-text">
            These are the possible states and transitions as defined in the agora YAML file.
            </p>
        </div>
    );
}

export default StateOverview;