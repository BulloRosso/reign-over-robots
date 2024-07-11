import * as React from 'react';
import { useContext } from 'react';

// own Components
import { AgentExecutorSessionContext } from '../contexts/agentExecutorContext';

import MermaidDiagram from './mermaidDiagram.js';
import example from "./exampleMermaidGantt.js";

interface ConversationLogEntry {
    sender: string;
    receiver: string;
    tokens: number;
    startTime: string;
    endTime: string;
    toolUsage: Array<toolUsageItem>
}

interface toolUsageItem  { 
    tool: string, 
    parameters: string, 
    status: string, 
    response: string,
    startTime: string,
    endTime: string
}  

const Costs = () => {
 
  const { agentExecutorSession, incr } = useContext(AgentExecutorSessionContext);
  const conversationLog = agentExecutorSession.session.conversationLog;

  const extractTime = (isoStringDate) => {
    const date = new Date(isoStringDate);

    const hours = date.getUTCHours().toString().padStart(2, '0');
    const minutes = date.getUTCMinutes().toString().padStart(2, '0');
    const seconds = date.getUTCSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  }

  const stripRole = (nameAndRole) => {
    return nameAndRole.split(' ')[0];
  }

  const getTokenUsage = () => {

        var totalTokens = 0;
        conversationLog.forEach((e: ConversationLogEntry,i) => {
            totalTokens += e.tokens;
        });

        return totalTokens;
  }

  const getRuntime = (startTime, endTime) => {
  
    const start = new Date(startTime);
    const end = new Date(endTime);

    const timeDiff = end.getTime() - start.getTime();
    return timeDiff / 1000;
  }

  const getTotalRuntime = () => { 
    var sum =0  
    conversationLog.forEach((e: ConversationLogEntry,i) => {       
        sum += getRuntime(e.startTime, e.endTime);
    });
    return sum;

  }

  const getSessionDiagram = () => {
    
        if (conversationLog == null || conversationLog === undefined) return null;

        var data = example + `\n`;

        conversationLog.forEach((e: ConversationLogEntry,i) => {

            // Calculate the time difference

            data += `   section ${stripRole(e.sender)}
                            ${e.tokens} Tk / ${getRuntime(e.startTime, e.endTime)}s   :a${i}, ${extractTime(e.startTime)}, ${extractTime(e.endTime)}\n`;
            if (e.toolUsage != null) {
                e.toolUsage.forEach((tool, j) => {
                    data += `       ${tool.tool + " (" + getRuntime(tool.startTime, tool.endTime) + "s)"} : crit, ${extractTime(tool.startTime)}, ${extractTime(tool.endTime)}\n`;
                });
            }
        });
        console.log(data);
        return data;
    }

    const sessionDiagram =  getSessionDiagram();

    const diagramData = sessionDiagram != null ? sessionDiagram : example;

    const tokenUsage = sessionDiagram != null ? getTokenUsage() : 0;
    const totalRuntime = sessionDiagram != null ? getTotalRuntime() : 0;


  return (
    <div>
        <p className ="info-text">
            <b>Token and Time Costs</b><br/>
            Shows the relation of consumed tokens to the runtime of the LLM.
        </p>
        <div className="cost-box">
            <p><b>Total Token Consumption</b>: {tokenUsage} tokens</p>
            <p><b>Total Runtime</b>: {totalRuntime} seconds</p>
            <MermaidDiagram chart={diagramData} />
        </div>
    </div>
    );
}

export default Costs;