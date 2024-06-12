import React from 'react';
import{ createContext, useContext, useState } from 'react';

export const AgentExecutorSessionContext = createContext(null);

const AgentExecutorSessionContextProvider = (props) => {

  const [agentExecutorSession, setAgentExecutorSession] = useState({ session: { agent: "Xenos", step: 1}}); 

  const incr = () => {
    setAgentExecutorSession({ session: { agent: "Xenos", step: agentExecutorSession.session.step + 1}})
  }

  return (
    <AgentExecutorSessionContext.Provider value={{ agentExecutorSession, incr }}>{props.children}</AgentExecutorSessionContext.Provider>
  )

}

export default AgentExecutorSessionContextProvider;