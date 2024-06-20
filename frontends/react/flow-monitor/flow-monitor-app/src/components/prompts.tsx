import * as React from 'react';
import { useContext } from 'react';

// MUI v5
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import HandymanOutlined from '@mui/icons-material/HandymanOutlined';
import SendOutlined from '@mui/icons-material/SendOutlined';

// own Components
import PromptInputParts from './promptInput';
import { AgentExecutorSessionContext } from '../contexts/agentExecutorContext';    
import MessageOutlined from '@mui/icons-material/MessageOutlined';
import ToolsUsed from './toolsUsed';  

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
    
const Prompts = () => {

    const { agentExecutorSession, incr } = useContext(AgentExecutorSessionContext);

    const [currentStepIdx, setStepIdx] = React.useState(0); // index of selected step
    const [value, setValue] = React.useState(0); // tab index

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    const setStep = () => {
      incr();
    }

    const steps = agentExecutorSession.session.steps ? agentExecutorSession.session.steps : 0;

    // use n-th element of the conversation log
    const conversationLogEntry = agentExecutorSession.session.conversationLog ?  agentExecutorSession.session.conversationLog[currentStepIdx].prompt : { summary: "", system: "", task: "", memory: ""};
    console.log("ConversationLogEntry: ", conversationLogEntry);
    return (
      <Box sx={{ width: '100%' }}>
        <Stack direction="row" spacing={1} sx={{ marginTop: "10px" }}>
            {
              [...Array(steps)].map((e,i) => {
                if (i != currentStepIdx) {
                    return <Chip key={"k" + (i+1)} label={i+1} sx={{ backgroundColor: "black", color: "white" }} 
                           onClick={() => setStepIdx(i)}
                    />
                } else {
                    return <Chip key={"k" + (i+1)} label={i+1} sx={{ backgroundColor: "gold" }} />
                }}
              )
            }
        </Stack>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
            <Tab {...a11yProps(0)} sx={{ textTransform: "none" }}
            label={
              <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                <SendOutlined />
              <Box component="span" sx={{ ml: 1 }}>Prompt</Box>
            </Box>
            }
            />
            <Tab {...a11yProps(1)} sx={{ textTransform: "none" }}
            label={
              <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                <MessageOutlined />
              <Box component="span" sx={{ ml: 1 }}>LLM response</Box>
            </Box>
            }
            />
            <Tab {...a11yProps(2)} sx={{ textTransform: "none" }}
            label={
              <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                <HandymanOutlined />
              <Box component="span" sx={{ ml: 1 }}>Tools used</Box>
            </Box>
            }
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
            <PromptInputParts value={conversationLogEntry}/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
            <span onClick={ () => setStep()}>Test: Increment global context STEP variable</span>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
             <ToolsUsed />
        </CustomTabPanel>
      </Box>
    );
}

export default Prompts;