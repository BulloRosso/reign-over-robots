import * as React from 'react';
import { useContext } from 'react';

// MUI v5
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
 

const PromptInputParts = (conversationLogEntry) => {
    
    const entry = conversationLogEntry.value;

    const shortInfo = (entry) => {
        if (!entry || entry.length == 0) {
            return "";
        }
        return entry.substring(0, 25) + "..." + " (" + entry.length + " Chars)";
    }

    return (
      <span id="promptBox">

            <Accordion  className="smallAccordionSummary"   sx={{ backgroundColor: '#f0faff'}} >
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
               
                >
                <Typography sx={{ width: '33%', flexShrink: 0 }}><b>System</b></Typography>
                <Typography sx={{ color: 'text.secondary' }}>{shortInfo(entry.system)}</Typography>
                </AccordionSummary>
                <AccordionDetails  className="whiteAccordionBox">
                <Typography className='input-text'>
                    {entry.system}
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded  className="smallAccordionSummary" sx={{ backgroundColor:  "#fff7e0" }}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
                >
                <Typography sx={{ width: '33%', flexShrink: 0 }}><b>Task</b></Typography>
                <Typography sx={{ color: 'text.secondary' }}>{shortInfo(entry.task)}</Typography>
                </AccordionSummary>
                <AccordionDetails className="whiteAccordionBox">
                <Typography  className='input-text'>
                    {entry.task}
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion  className="smallAccordionSummary" sx={{ backgroundColor:  "#ffe2ad" }}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
                >
                <Typography sx={{ width: '33%', flexShrink: 0 }}><b>Memory</b></Typography>
                <Typography sx={{ color: 'text.secondary' }}>{shortInfo(entry.memory)}</Typography>
                </AccordionSummary>
                <AccordionDetails  className="whiteAccordionBox">
                <Typography  className='input-text'>
                    {entry.memory}
                </Typography>
                </AccordionDetails>
            </Accordion>

           
        </span>
    )
}

export default PromptInputParts;