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
import FindInPageOutlined from '@mui/icons-material/FindInPageOutlined';
import { formatDistanceToNow,formatDate } from 'date-fns';
import { AgentExecutorSessionContext } from '../contexts/agentExecutorContext';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
interface tool {
    tool: string;
    timestamp: string;
    parameters: string;
    status: string;
    response: string;
}

const ToolsUsed = (tools) => {
    
    const toolsArr : tool[] = tools.value;
    // const { agentExecutorSession, incr, updateSession } = useContext(AgentExecutorSessionContext);
   
    if (toolsArr == undefined) 
        return (<div></div>);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [dialogContent, setDialogContent] = React.useState("");

    const  handleResponseClick = (response) => {
        setDialogContent(response);
        setDialogOpen(true);
        setAnchorEl(null);
    };

    const handleCloseDialog = () => {
      setDialogOpen(false);
    };

    return (
    <div>

        <TableContainer sx={{ minWidth: 650, minHeight: 340, overflow: "hidden" }}>
        <Table  size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Tool</TableCell>
              <TableCell align="left">Timestamp</TableCell>
              <TableCell align="left">Parameters</TableCell>
              <TableCell align="left">Response</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {toolsArr.map((row) => (
              <TableRow
                key={row.timestamp}
                sx={{ verticalAlign: "middle", '&:last-child td, &:last-child th': { border: 0 } }}
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
                <TableCell align="left"><FindInPageOutlined onClick={ () => handleResponseClick(row.response)} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
          open={dialogOpen}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
          <DialogTitle id="alert-dialog-title">Tool response</DialogTitle>
          <DialogContent>
          <DialogContentText id="alert-dialog-description">
              {dialogContent}
          </DialogContentText>
          </DialogContent>
          <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
              Close
          </Button>
          </DialogActions>
      </Dialog>
      
    </div>
    );
}

export default ToolsUsed;