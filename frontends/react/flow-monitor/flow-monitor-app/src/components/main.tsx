import * as React from 'react';

// Material UI v5
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

// Own components
import WelcomeInfo from './welcome';
import StateOverview from './finitestatemachine';
import AgenticInteraction from './agenticInteraction';

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

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };
  
    return (
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
            <Tab label="Welcome" {...a11yProps(0)} sx={{ textTransform: "none" }}/>
            <Tab label="Agentic Flow" {...a11yProps(1)} sx={{ textTransform: "none" }}/>
            <Tab label="State Overview" {...a11yProps(2)} sx={{ textTransform: "none" }}/>
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
      </Box>
    );
}

export default MainScreen;