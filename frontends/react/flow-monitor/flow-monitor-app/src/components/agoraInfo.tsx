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
    
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
      setOpen(!open);
    };

    const { agentExecutorSession, incr } = useContext(AgentExecutorSessionContext);
    console.log("Files: ", agentExecutorSession.session.files) 


    return (
      <div>
        Agora Info placeholder
      </div>
    );
}

export default AgoraInfo;