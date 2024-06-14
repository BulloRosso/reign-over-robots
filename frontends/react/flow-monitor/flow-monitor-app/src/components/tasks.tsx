import * as React from 'react';
import { useContext } from 'react';

// MUI v5
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StarBorder from '@mui/icons-material/StarBorderOutlined';
import StarBorderFilled from '@mui/icons-material/StarOutlined';

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
        sx={{padding: 0, width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        { agentExecutorSession && agentExecutorSession.session.tasks ? (
                  agentExecutorSession.session.tasks.map((e,i) => {
                   return <ListItemButton key={"k" + (i+1)}>
                            <ListItemIcon>
                              { e.status === "completed" ? <StarBorderFilled  className="task-completed"  titleAccess=':completed' /> : <StarBorder />}
                            </ListItemIcon>
                            <ListItemText primary={e.title} />
                        </ListItemButton>
                  })
                  ) : (
                 <div className="info-box">
                    No tasks / no session loaded.
                </div>
        )}
        
      </List>
    );
}

export default TaskList;