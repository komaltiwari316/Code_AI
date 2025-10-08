import React from 'react'
import { useState } from 'react';
import './Differencecode.css'
import axios from 'axios';

const Differencecode = () => {
  const [input ,setinput]=useState("");
  const [output,setoutput]=useState("");

  const handlediff=async()=>{
    try{
      const res=await axios.post('http://localhost:5000/ai/ask-ai',{
        task:"difference",
        prompt:input
      })
      setoutput(res.data.result);
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div className="lang-conversion-container">
      <div className="left">
        <textarea placeholder="Enter code to convert..." value={input} onChange={(e)=>setinput(e.target.value)}/>
        <button onClick={handlediff}>Difference</button>
      </div>
      <div className="right">
        <div className="code-block">
          <pre>{output}</pre>
        </div>
      </div>
    </div>
  )
}

export default Differencecode
