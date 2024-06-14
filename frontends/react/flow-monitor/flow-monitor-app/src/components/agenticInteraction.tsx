import * as React from 'react';
import MermaidDiagram from './mermaidDiagram.js';
import example from "./exampleMermaidInteractionData.js";

const AgenticInteraction = () => {
    
    return (
        <div>
            <MermaidDiagram chart={example} />
        </div>
    );
}

export default AgenticInteraction;