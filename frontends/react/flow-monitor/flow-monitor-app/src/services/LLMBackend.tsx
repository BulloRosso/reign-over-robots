import React, { useState, useEffect } from 'react';

const LLMBackend = () => {

    const [data, setData] = useState("ERROR");

    const ping = async () => { 
        const response = await fetch('http://localhost:11434');
    }

    return {
        ping
    };
}

export default LLMBackend;