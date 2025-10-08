import React, { useState } from 'react';
import './CodeGen.css';
import axios from 'axios';

const CodeGen = () => {
  const [input, setInput] = useState("");   // User prompt
  const [output, setOutput] = useState(""); // AI generated code

  const HandleGenerationCode = async () => {
    try {
      const res = await axios.post('http://localhost:5000/ai/ask-ai', {
        task: "codegen",
        prompt: input
      });

      setOutput(res.data); // AI code output
    } catch (err) {
      console.log(err);
    }
  };

  const HandleReset=()=>{
    setInput("")
    setOutput("")
  }

  return (
    <div className='container'>
      <div className='left'>
        <textarea
          placeholder="Enter prompt here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <button onClick={HandleGenerationCode}>Code Generation</button>
        <button onClick={HandleReset}>Reset</button>
      </div>
      <div className='right'>
        <h3>Code:</h3>
        <pre className="code-block">{output}</pre>
      </div>

    </div>
  );
};

export default CodeGen;

