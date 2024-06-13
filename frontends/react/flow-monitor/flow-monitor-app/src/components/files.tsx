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

const FileList = () => {
    
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
      setOpen(!open);
    };

    const { agentExecutorSession, incr } = useContext(AgentExecutorSessionContext);
    console.log("Files: ", agentExecutorSession.session.files) 


    return (
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        
      >
        { agentExecutorSession && agentExecutorSession.session.files ? (
                  agentExecutorSession.session.files.map((e,i) => {
                   return <ListItemButton key={"k" + (i+1)}>
                            <ListItemIcon>
                              <FileIcon />
                            </ListItemIcon>
                            <ListItemText primary={e} />
                        </ListItemButton>
                  })
                  ) : (
                 <div className="info-box">
                    No files / no session loaded.
                </div>
        )}
        
      </List>
    );
}

export default FileList;