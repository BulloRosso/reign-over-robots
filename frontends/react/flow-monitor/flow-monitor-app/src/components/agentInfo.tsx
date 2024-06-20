import * as React from 'react';
import { useContext } from 'react';

// MUI v5
import EventBusyOutlinedIcon from '@mui/icons-material/EventBusyOutlined';

// own Components
import { AgentExecutorSessionContext } from '../contexts/agentExecutorContext';

const AgentInfo = () => {

    const { agentExecutorSession, incr } = useContext(AgentExecutorSessionContext);
    
    const agentImg = agentExecutorSession.session.agentProfile ? agentExecutorSession.session.agentProfile.imageUrl : "";
    const agentName = agentExecutorSession.session.agentProfile ? agentExecutorSession.session.agentProfile.name : "";
    const role = agentExecutorSession.session.agentProfile ? agentExecutorSession.session.agentProfile.role : "";
    const mission = agentExecutorSession.session.agentProfile ? agentExecutorSession.session.agentProfile.mission : "";
    const dueDate = agentExecutorSession.session.agentProfile ? agentExecutorSession.session.agentProfile.dueDate : "";


    return (
      <div style={{ padding: "8px" }}>
        <b>{agentName}</b> ({role})<br></br>
        <p style={{ color:"#999"}}>
          {mission}
        </p>
        <img src={agentImg} style={{ maxWidth:"150px", maxHeight: "150px" }} />
        <p>
          <EventBusyOutlinedIcon style={{ color: "#999", top: "5px", position: "relative"}} /> {dueDate}
        </p>
      </div>
    );
}

export default AgentInfo;