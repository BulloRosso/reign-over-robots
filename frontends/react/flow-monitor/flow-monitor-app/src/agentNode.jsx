import React from 'react';
import { Handle } from 'reactflow';

const AgentNode = ({ data }) => {
    return (
        <div style={{ padding: '10px', background: 'lightblue', borderRadius: '5px' }}>
            Custom {data.label}
            <Handle
                type="target"
                position="top"
                id="top-handle"
                style={{ background: '#555' }}
                onConnect={(params) => console.log('handle onConnect', params)}
            />
            <Handle
                type="source"
                position="bottom"
                id="bottom-handle"
                style={{ background: '#555' }}
                onConnect={(params) => console.log('handle onConnect', params)}
            />
            <Handle
                type="target"
                position="left"
                id="left-handle"
                style={{ background: '#555' }}
                onConnect={(params) => console.log('handle onConnect', params)}
            />
            <Handle
                type="source"
                position="right"
                id="right-handle"
                style={{ background: '#555' }}
                onConnect={(params) => console.log('handle onConnect', params)}
            />
        </div>
    );
};

export default AgentNode;