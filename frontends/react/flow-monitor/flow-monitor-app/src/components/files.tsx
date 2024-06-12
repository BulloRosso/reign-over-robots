import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FileIcon from '@mui/icons-material/InsertDriveFileOutlined';
import StarBorder from '@mui/icons-material/StarBorder';

const FileList = () => {
    
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
      setOpen(!open);
    };
  
    return (
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Files
          </ListSubheader>
        }
      >
        <ListItemButton>
          <ListItemIcon>
            <FileIcon />
          </ListItemIcon>
          <ListItemText primary="calculation.xls" />
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
          <FileIcon />
          </ListItemIcon>
          <ListItemText primary="contract.pdf" />
        </ListItemButton>
        
      </List>
    );
}

export default FileList;