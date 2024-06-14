import * as React from 'react';
import { useEffect, useContext } from 'react';

// Material UI v5
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import MoveDownOutlined from '@mui/icons-material/MoveDownOutlined';
import SignpostOutlined from '@mui/icons-material/SignpostOutlined';
import EmojiPeopleOutlined from '@mui/icons-material/EmojiPeopleOutlined';

// Own components
import WelcomeInfo from './welcome';
import StateOverview from './finitestatemachine';
import AgenticInteraction from './agenticInteraction';
import { AgentExecutorSessionContext } from '../contexts/agentExecutorContext';
import MqttSignals from './mqttSignals';

interface TabPanelProps {
children?: React.ReactNode;
    index: number;
    value: number;
}
  
function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
    <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
    >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
    );
}

function a11yProps(index: number) {
    return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
    };
}

const MainScreen = () => {

    const { agentExecutorSession, incr, updateSession } = useContext(AgentExecutorSessionContext);
   
    const [value, setValue] = React.useState(0);
    
    React.useEffect(() => {
      const isAgentLoaded = agentExecutorSession && agentExecutorSession.session.tasks ? 1 : 0;
      setValue(isAgentLoaded);
    }, [agentExecutorSession]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
  
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
            <Tab label="About this app" {...a11yProps(0)} sx={{ textTransform: "none" }} 
            />
            <Tab  {...a11yProps(1)} sx={{ textTransform: "none" }}
             label={
              <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                <SignpostOutlined />
              <Box component="span" sx={{ ml: 1 }}>Agentic Flow</Box>
            </Box>
            }
            />
            <Tab {...a11yProps(2)} sx={{ textTransform: "none" }}
            label={
              <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                <MoveDownOutlined />
              <Box component="span" sx={{ ml: 1 }}>State Transition Diagram</Box>
            </Box>
            }
            />
            <Tab {...a11yProps(3)} sx={{ textTransform: "none" }}
            label={
              <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                <EmojiPeopleOutlined />
              <Box component="span" sx={{ ml: 1 }}>Human in the Loop</Box>
            </Box>
            }
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
           <WelcomeInfo/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
           <AgenticInteraction      />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <StateOverview/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <MqttSignals/>
        </CustomTabPanel>
      </Box>
    );
}

export default MainScreen;