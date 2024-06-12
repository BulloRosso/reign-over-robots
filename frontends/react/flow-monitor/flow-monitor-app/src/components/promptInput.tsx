import * as React from 'react';

// MUI v5
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const PromptInputParts = () => {
    
    return (
      <span id="promptBox">

            <Accordion   sx={{ backgroundColor: '#f0faff'}} >
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
               
                >
                <Typography sx={{ width: '33%', flexShrink: 0 }}><b>System</b></Typography>
                <Typography sx={{ color: 'text.secondary' }}>You are a merchant... (170 Chars)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded sx={{ backgroundColor:  "#fff7e0" }}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
                >
                <Typography sx={{ width: '33%', flexShrink: 0 }}><b>Task</b></Typography>
                <Typography sx={{ color: 'text.secondary' }}>Buy one can of Red...(276 Chars)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={{ backgroundColor:  "#ffe2ad" }}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
                >
                <Typography sx={{ width: '33%', flexShrink: 0 }}><b>Memory</b></Typography>
                <Typography sx={{ color: 'text.secondary' }}>Don't contact Mary. (25 Chars)</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                </Typography>
                </AccordionDetails>
            </Accordion>

           
        </span>
    )
}

export default PromptInputParts;