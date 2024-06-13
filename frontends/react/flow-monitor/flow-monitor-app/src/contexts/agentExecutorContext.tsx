import React from 'react';
import{ createContext, useContext, useState } from 'react';

export const AgentExecutorSessionContext = createContext({ session: { agent: "Xenos", step: 1}});

const AgentExecutorSessionContextProvider = (props) => {

  const [agentExecutorSession, setAgentExecutorSession] = useState({ session: { agent: "Xenos", step: 1}}); 

  // just a test function to increment the step
  const incr = () => {
    setAgentExecutorSession({ session: { agent: "Xenos", step: agentExecutorSession.session.step + 1}})
  }

  // used as pass-around function to update the session
  const updateSession = (data) => {
    setAgentExecutorSession({ session: data});
    console.info("Session updated: ", data);
  }

  return (
    <AgentExecutorSessionContext.Provider value={{ agentExecutorSession, incr, updateSession }}>{props.children}</AgentExecutorSessionContext.Provider>
  )

}

export default AgentExecutorSessionContextProvider;