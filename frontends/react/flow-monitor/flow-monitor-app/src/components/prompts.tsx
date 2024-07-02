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
import PromptResponse from './promptResponse'; 
import placeholder from '../assets/help-prompt-section.jpg';
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

    const { agentExecutorSession, incr, updateSession } = useContext(AgentExecutorSessionContext);

    const [currentStepIdx, setStepIdx] = React.useState(1); // index of selected step
    const [value, setValue] = React.useState(0); // tab index

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    const setStep = () => {
      incr();
    }

    const handleStepIdxClick = (idx) => {  
      if (idx %2 != 0) {
        setValue(0); // Prompt tab
      } else {
        setValue(1); // Response tab
      }
      setStepIdx(idx);
      agentExecutorSession.session.currentStep = idx;
      updateSession( agentExecutorSession.session);
    }

    // mapping required because one index in the conversation log corresponds to two steps in the flow (prompt and response)
    const mapToOriginal = (idx) => {
      if (idx == 1 || idx == -1) 
        return 0;

      if (idx % 2 === 0)  
        return idx / 2;
     
      return (idx -1)/2;
    }

    const steps = agentExecutorSession.session.steps ? (agentExecutorSession.session.steps * 2)-1 : 0;

    // use n-th element of the conversation log
    const conversationLogEntry = agentExecutorSession.session.conversationLog ?  agentExecutorSession.session.conversationLog[mapToOriginal(currentStepIdx)] : {prompt: { summary: "", system: "", task: "", memory: ""}};
    
    return (
      <Box sx={{ width: '100%' }}>
        { agentExecutorSession.session.conversationLog ? (
        <span>
        <Stack direction="row" spacing={1} sx={{ marginTop: "10px", padding:"10px", paddingBottom: 0 }}>
            {
              [...Array(steps)].map((e,i) => {
                if ((i +1) != currentStepIdx) {
                    return <Chip key={"k" + (i+1)} label={i+1} sx={{ backgroundColor: "black", color: "white" }} 
                           onClick={() => handleStepIdxClick(i + 1)}
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
              <Box component="span" sx={{ ml: 1 }}>Actions (Tools used)</Box>
            </Box>
            }
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
            <PromptInputParts value={conversationLogEntry.prompt}/>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
            <PromptResponse value={conversationLogEntry.response} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
             <ToolsUsed value={conversationLogEntry.toolUsage}/>
        </CustomTabPanel>
        </span>
        ) : (
          <img src={placeholder} width="580px" style={{padding:"10px"}}></img>
        )}
      </Box>
    );
}

export default Prompts;