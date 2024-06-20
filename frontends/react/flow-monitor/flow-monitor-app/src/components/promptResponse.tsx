import * as React from 'react';
import { useContext } from 'react';

const PromptResponse = (response) => {

    return (
        <div className="response-text">
            {response.value}
        </div>
      )
  }
  
  export default PromptResponse;