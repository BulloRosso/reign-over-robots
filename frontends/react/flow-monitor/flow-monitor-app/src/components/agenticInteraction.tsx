import * as React from 'react';
import { useContext } from 'react';
import MermaidDiagram from './mermaidDiagram.js';
import example from "./exampleMermaidInteractionData.js";

// own components
import { AgentExecutorSessionContext } from '../contexts/agentExecutorContext';

/*
Mermaid diagram example:

sequenceDiagram
    autonumber
    participant Alice
    participant John
    link Alice: Display Status @ agent/alice
    link John: Display Status @ agent/john
    Alice->>+John: Hello John, how are you?
    Alice->>+John: John, can you hear me?
    John-->>-Alice: Hi Alice, I can hear you!
    John-->>-Alice: I feel great!
*/
interface PromptComponents {
    summary: string;
}
interface ConversationLogEntry {
    sender: string;
    receiver: string;
    summary: string;
    response: string;
    prompt: PromptComponents;
}

const AgenticInteraction = () => {
    
    const { agentExecutorSession, incr } = useContext(AgentExecutorSessionContext);
    const conversationLog = agentExecutorSession.session.conversationLog;

    const getSessionDiagram = (conversationLog) => {
    
        if (conversationLog == null || conversationLog === undefined) return null;

        var data = `sequenceDiagram
    autonumber\n`;

        var participantList = [];

        conversationLog.forEach((e: ConversationLogEntry,i) => {

            if (!participantList.includes(e.sender)) {
                participantList.push(e.sender);
                data += `    participant ${e.sender}\n`;
            }

            if (!participantList.includes(e.receiver)) {
                participantList.push(e.receiver);
                data += `    participant ${e.receiver}\n`;
            }

            data += `    ${e.sender}->>${e.receiver}: ${e.prompt.summary}\n`;
            if (i > 0)  
               data += `    ${e.receiver}-->>${e.sender}: ${e.response}\n`; 
           
        });
        console.log(data);
        return data;
    }

    const sessionDiagram =  getSessionDiagram(conversationLog);

    const diagramData = sessionDiagram != null ? sessionDiagram : example;

    return (
        <div>
            <MermaidDiagram chart={diagramData} />
        </div>
    );
}

export default AgenticInteraction;