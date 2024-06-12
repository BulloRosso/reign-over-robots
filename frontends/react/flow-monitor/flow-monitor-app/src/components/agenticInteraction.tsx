import * as React from 'react';
import MermaidDiagram from './mermaidDiagram.js';
import example from "./exampleMermaidInteractionData.js";

const AgenticInteraction = () => {
    
    return (
        <p>
            <MermaidDiagram chart={example} />
        </p>
    );
}

export default AgenticInteraction;