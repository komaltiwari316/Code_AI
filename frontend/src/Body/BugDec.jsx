import React, { useState } from 'react'
import './BugDec.css'
import axios from 'axios';

const BugDec = () => {
  const [input,setinput]=useState("");
  const [output,setoutput]=useState("");

  const HandleDetect=async()=>{
    try{
      const res=await axios.post("http://localhost:5000/ai/ask-ai",{
        task:"bug-detect",
        prompt:input
      })
      setoutput(res.data.result);
    }catch(error){
      console.error(error);
    }
  }
  return (
    <>
      <div className='container'>
        <div className='left'>
          <textarea name="" id="" value={input} onChange={(e)=>setinput(e.target.value)} placeholder='Enter Your Code Here......'/>
          <button onClick={HandleDetect}>Detect</button>
        </div>
        <div className='right'>{output}</div>
      </div>
    </>
  )
}

export default BugDec