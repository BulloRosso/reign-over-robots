import * as React from 'react';
import MermaidDiagram from './mermaidDiagram.js';
import example from "./exampleMermaidData.js";

const StateOverview = () => {
    
    return (
        <p>
            <MermaidDiagram chart={example} />
            These are the possible states and transitions as defined in the agora YAML file.
        </p>
    );
}

export default StateOverview;