import React from 'react'
import { useState } from 'react';
import './Optimization.css';
import axios from 'axios';

const Optimization = () => {
  const [input, setinput] = useState("");
  const [output, setoutput] = useState("");

  const handleOptimization = async () => {
    try {
      const res = await axios.post('https://code-ai-backend-n8lb.onrender.com/ai/ask-ai', {
        task: "optimize",
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
        <button onClick={handleOptimization}>Optimizat code</button>
      </div>
      <div className="right">
        <div className="code-block">
          <pre>{output}</pre>
        </div>
      </div>
    </div>
  )
}

export default Optimization
