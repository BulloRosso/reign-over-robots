import React from "react"
import Paper from '@mui/material/Paper';

const Item = ({ data }) => {
    return (
        <Paper elevation={3}>
            Item {data}
        </Paper>
    )
}

export default Item;