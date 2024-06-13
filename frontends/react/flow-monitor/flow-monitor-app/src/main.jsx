import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.tsx'

// Styles
import './index.css'

// own components
import AgentExecutorSessionContextProvider from './contexts/agentExecutorContext';

/*
   This app uses the context API to manage the state of the agent executor session. 

   This app requires React 17.0.2 (otherwise the render Method will not work)!
*/
const rootNode = document.getElementById('root');
ReactDOM.render(
    <AgentExecutorSessionContextProvider>
        <App />
    </AgentExecutorSessionContextProvider>, rootNode);
