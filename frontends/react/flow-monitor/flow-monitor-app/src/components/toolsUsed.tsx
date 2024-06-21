import * as React from 'react';
import { useContext } from 'react';

// MUI v5
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import CircleCoutlined from '@mui/icons-material/CircleOutlined';
import { formatDistanceToNow,formatDate } from 'date-fns';
import { AgentExecutorSessionContext } from '../contexts/agentExecutorContext';

interface tool {
    tool: string;
    timestamp: string;
    parameters: string;
    status: string;
}

const ToolsUsed = (tools) => {
    
    const toolsArr : tool[] = tools.value;
    // const { agentExecutorSession, incr, updateSession } = useContext(AgentExecutorSessionContext);
   
    if (toolsArr == undefined) 
        return (<div></div>);

    return (
    <div>

        <TableContainer>
        <Table sx={{ minWidth: 650, minHeight: 340, overflow: "hidden" }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Tool</TableCell>
              <TableCell align="left">Timestamp</TableCell>
              <TableCell align="left">Parameters</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {toolsArr.map((row) => (
              <TableRow
                key={row.timestamp}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">
                    { row.status == "Success" ? 
                    <CircleCoutlined sx={{ width: "20px", color: "green", marginRight: "8px", position: "relative", top: "5px;"}}/>
                    :
                    <CircleCoutlined sx={{ width: "20px", color: "red", marginRight: "8px", position: "relative", top: "5px;"}}/>
                    }
                    <b>{row.tool}</b></TableCell>
                <TableCell component="th" scope="row">
                  {row.timestamp}
                </TableCell>
                
                <TableCell align="left">{JSON.stringify(row.parameters)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      
    </div>
    );
}

export default ToolsUsed;