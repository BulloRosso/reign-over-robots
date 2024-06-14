import * as React from 'react';

// MUI v5
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { formatDistanceToNow,formatDate } from 'date-fns';

const MqttSignals = () => {
    
    function createData(
        sender: string,
        timestampUTC: string,
        message: string,
      ) {

        // const timestampRelative = formatDistanceToNow(new Date(timestampUTC), { addSuffix: true });
        const timestampRelative = formatDate(new Date(timestampUTC), 'MM/dd HH:mm');
        return { timestampRelative, sender, message };
      }
      
    const rows = [
    createData('Homebase', "2024-06-14T12:01Z", "Add two kilos of olives to the shopping list"),
    createData('Agent', "2024-06-14T12:25Z", "Confirmed 'olives'. But no merchant offers olives on the market."),
    createData('Homebase', "2024-06-14T15:31Z", "Add three apples instead of olives to the shopping list"),
    createData('Agent', "2024-06-14T15:32Z", "Confirmed 'apples'. Apples are available at the market."),
    createData('Agent',"2024-06-14T15:45Z", "Baught apples at the market."),
    ];

    return (
    <div>
        <TableContainer>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Sender</TableCell>
              <TableCell align="left">Timestamp</TableCell>
              <TableCell align="left">Message</TableCell>
              
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.timestampRelative}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.timestampRelative}
                </TableCell>
                <TableCell align="left">{row.sender}</TableCell>
                <TableCell align="left">{row.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

        <p className ="info-text">
            Communication between agent controller and deployed agents is done via MQTT. This is a list of all MQTT signals that are sent and received by the agent controller.
        </p>
    </div>
    );
}

export default MqttSignals;