import * as React from 'react';
import { useContext } from 'react';

// MUI v5
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarBorder from '@mui/icons-material/StarBorder';

// own Components
import { AgentExecutorSessionContext } from '../contexts/agentExecutorContext';

const TaskList = () => {
    
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
      setOpen(!open);
    };
  
    const { agentExecutorSession, incr } = useContext(AgentExecutorSessionContext);
    console.log("Tasks: ", agentExecutorSession.session.tasks) 

    return (
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Tasks
          </ListSubheader>
        }
      >
      { agentExecutorSession && agentExecutorSession.session.tasks ? (
                  [...Array(agentExecutorSession.session.tasks)].map((e,i) => {
                   return (<ListItemButton key={"k" + (i+1)}>
                            <ListItemIcon>
                              <StarBorder />
                            </ListItemIcon>
                            <ListItemText primary={e} />
                        </ListItemButton>)
                  })
                  ) : (
                 <div className="info-box">
                    No tasks or no session loaded.
                </div>
        )}
        
      </List>
    );
}

export default TaskList;