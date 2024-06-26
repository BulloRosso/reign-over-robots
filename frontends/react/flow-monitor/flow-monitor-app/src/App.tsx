
import * as React from 'react';
import { useState, useContext } from 'react';

// Material UI v5
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';
import RunIcon from '@mui/icons-material/PlayArrowRounded';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import Item from './item';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material/Select';
import { makeStyles } from '@mui/styles';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// Own components
import MainScreen from './components/main';
import Prompts from './components/prompts';
import ConnectivityInfo from './components/connectivityInfo';
import { AgentExecutorSessionContext } from './contexts/agentExecutorContext';
import AgentExecutorBackend from './services/AgentExecutorBackend';
import TasksAndFiles from './components/tasksAndFiles';

// Styles
import './App.css';
import AgoraAndAgent from './components/agoraAndAgent';

const useStyles = makeStyles({
    select: {
      "&:before": {
        // normal
        borderBottomColor: "white"
      },
      "&:after": {
        // focused
        borderBottomColor: "white"
      },
      "&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error):before": {
        // hover
        borderBottomColor: "white",
        borderWidth: "1px"
      },
      "& .MuiSvgIcon-root": {
        color: "white",
      },
      '&.MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
    },
    }
});

export default function App() {

    const backend = AgentExecutorBackend();
    
    const { agentExecutorSession, incr, updateSession } = useContext(AgentExecutorSessionContext);
   
    const isAgentLoaded = agentExecutorSession && agentExecutorSession.session.tasks ? true : false;

    const [agentName, setAgentName] = React.useState("Xenos");

    const handleChange = (event: SelectChangeEvent) => {
        setAgentName(event.target.value);
        console.log("Agent selected: ", event.target.value);
    };

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [dialogOpen, setDialogOpen] = React.useState(false);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSessionLoad = () => {
        backend.loadSession(agentName, updateSession); 
    };

    const handleClickBurgerMenuItem = () => {
        setDialogOpen(true);
        setAnchorEl(null);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
      };

    return (
        <div>
            
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" sx={{ backgroundColor: "#ebba34" }}>
                    <Toolbar variant="dense">
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleClick}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleClickBurgerMenuItem}>Change agora</MenuItem>
                        <MenuItem onClick={handleClickBurgerMenuItem}>Check backend API</MenuItem>
                        <MenuItem onClick={handleClickBurgerMenuItem}>Reset</MenuItem>
                    </Menu>

                    <Dialog
                        open={dialogOpen}
                        onClose={handleCloseDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Not implemented"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            This is a non-vital function and will be implemented at a later stage.
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleCloseDialog} autoFocus>
                            I understand
                        </Button>
                        </DialogActions>
                    </Dialog>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        AgentZ Agora
                    </Typography>
                    
                    <FormControl size="small" variant="standard" className='agent-select'>
                    
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={agentName}
                            label="Agent"
                            disableUnderline={true}
                            onChange={handleChange}
                            className={classes.select}
                            sx={{
                                color: 'white',
                                borderColor: 'white',
                            }}
                        >
                            <MenuItem value={"Xenos"}>Xenos@Heraklion</MenuItem>
                            <MenuItem value={"Martha"}>Martha@Heraklion</MenuItem>
                            <MenuItem value={"Joe"}>Joe@Heraklion</MenuItem>
                        </Select>
                    </FormControl>
                    <Button color="inherit" 
                            startIcon={<RunIcon/>} 
                            onClick={handleSessionLoad}
                            variant="outlined" 
                            className={!isAgentLoaded ? "divWithRotatingBorder" : ""}
                            sx={{ marginLeft: "20px",
                                textTransform: "none"
                            }}
                            >Run Agent</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <Grid container spacing={2} className="hello">
                <Grid xs={8}>
                   <Paper elevation={3}><MainScreen/></Paper>
                </Grid>
                <Grid xs={4}>
                    <Paper elevation={3}><TasksAndFiles/></Paper>
                </Grid>
                <Grid xs={8}>
                   <Paper elevation={3}><Prompts/></Paper>
                </Grid>
                <Grid xs={4}>
                    <Paper elevation={3}><AgoraAndAgent/></Paper>
                </Grid>
                <Grid xs={12}>
                    <ConnectivityInfo/>
                </Grid>
            </Grid>
            
        </div>
    )
}