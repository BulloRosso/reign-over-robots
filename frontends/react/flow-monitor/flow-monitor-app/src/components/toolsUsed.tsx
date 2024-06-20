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

const ToolsUsed = () => {
    
    function createData(
        tool: string,
        timestampUTC: string,
        params: string,
      ) {

        // const timestampRelative = formatDistanceToNow(new Date(timestampUTC), { addSuffix: true });
        const timestampRelative = formatDate(new Date(timestampUTC), 'MM/dd HH:mm');
        return { tool, timestampRelative, params };
      }
      
    const rows = [
    createData('WebScraper', "2024-06-14T12:01Z", "('https://www.market.com', 'olives')"),
    createData('Transactions', "2024-06-14T12:25Z", "('olives', '2')"),
    ];
    

    const { agentExecutorSession, incr, updateSession } = useContext(AgentExecutorSessionContext);
   
    const [telemetryLog, setTelemetryLog] = React.useState([]);
    
    React.useEffect(() => {
      const isAgentLoaded = agentExecutorSession && agentExecutorSession.session.telemetryLog ? 1 : 0;
      if (isAgentLoaded === 1)
        setTelemetryLog(agentExecutorSession.session.telemetryLog);
    }, [agentExecutorSession]);

 //   const rows = telemetryLog.map((e,i) => {
 //     return createData(e.sender, e.timestamp, e.message);
 //   });

    return (
    <div>

        <TableContainer>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Tool</TableCell>
              <TableCell align="left">Timestamp</TableCell>
              <TableCell align="left">Parameters</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.timestampRelative}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">
                    <CircleCoutlined sx={{ width: "20px", color: "#ccc", marginRight: "8px", position: "relative", top: "5px;"}}/>
                    <b>{row.tool}</b></TableCell>
                <TableCell component="th" scope="row">
                  {row.timestampRelative}
                </TableCell>
                
                <TableCell align="left">{row.params}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      
    </div>
    );
}

export default ToolsUsed;