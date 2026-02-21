import React, { useState } from 'react';
import './LangConversion.css';
import axios from 'axios';

const LangConversion = () => {
  const [input, setinput] = useState("");
  const [output, setoutput] = useState("");

  const handleConvert = async () => {
    try {
      const res = await axios.post('https://code-ai-backend-n8lb.onrender.com/ai/ask-ai', {
        task: "LangConversion",
        prompt: input
      })
      setoutput(res.data.result);
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="lang-conversion-container">
      <div className="left">
        <textarea placeholder="Enter code to convert..." value={input} onChange={(e) => setinput(e.target.value)} />
        <button onClick={handleConvert}>Convert</button>
      </div>
      <div className="right">
        <div className="code-block">
          <pre>{output}</pre>
        </div>
      </div>
    </div>
  );
};

export default LangConversion;

