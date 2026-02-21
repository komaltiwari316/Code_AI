import React, { useState } from 'react'
import './BugDec.css'
import axios from 'axios'

const CodeExpl = () => {
  const [input, setinput] = useState("");
  const [output, setoutput] = useState("");

  const HandleExplain = async () => {
    try {
      const res = await axios.post('https://code-ai-backend-n8lb.onrender.com/ai/ask-ai', {
        task: "explain",
        prompt: input
      });

      setoutput(res.data.result)
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <div className='container'>
        <div className='left'>
          <textarea name="" id="" value={input} onChange={(e) => setinput(e.target.value)} placeholder='Enter Your Code Here......' />
          <button onClick={HandleExplain}>Explain my code</button>
        </div>
        <div className='right'>{output}</div>
      </div>
    </>
  )
}

export default CodeExpl