import * as React from 'react';
import { useContext } from 'react';

// MUI v5
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FileIcon from '@mui/icons-material/InsertDriveFileOutlined';

// own Components
import { AgentExecutorSessionContext } from '../contexts/agentExecutorContext';

const AgoraInfo = () => {
 
  const { agentExecutorSession, incr } = useContext(AgentExecutorSessionContext);
    
  const agoraImg = agentExecutorSession.session.agoraProfile ? agentExecutorSession.session.agoraProfile.imageUrl : "";
  const agoraName = agentExecutorSession.session.agoraProfile ? agentExecutorSession.session.agoraProfile.name : "";
  const agoraDescription = agentExecutorSession.session.agoraProfile ? agentExecutorSession.session.agoraProfile.description : "";

  return (
    <div style={{ padding: "8px" }}>
      <b>{agoraName}</b><br></br>
      <p style={{ color:"#999"}}>
          {agoraDescription}
        </p>
      <img src={agoraImg} style={{ maxWidth:"200px", maxHeight: "200px" }} />
    </div>
    );
}

export default AgoraInfo;