import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import './DatabaseCode.css'

const DatabaseCode = () => {
   const [input ,setinput]=useState("");
  const [output,setoutput]=useState("");

  const handledatabase=async()=>{
    try{
      const res=await axios.post('http://localhost:5000/ai/ask-ai',{
        task:"databasecode",
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
        <textarea placeholder="Enter Your data..." value={input} onChange={(e)=>setinput(e.target.value)}/>
        <button onClick={handledatabase}>Database</button>
      </div>
      <div className="right">
        <div className="code-block">
          <pre>{output}</pre>
        </div>
      </div>
    </div>
  )
}

export default DatabaseCode
