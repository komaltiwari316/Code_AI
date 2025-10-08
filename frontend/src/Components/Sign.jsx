import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Sign.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Sign = () => {
  const [name,setname]=useState("");
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const navigate = useNavigate();


  const HandleSignup = async(e) => {
    e.preventDefault();
     try{
      const res=await axios.post('http://localhost:5000/User/signup',{
        name,
        email,
        password
      });
      alert("signup successfully")
      navigate('/login')
    } catch (error) {
      console.error("Error signing up:", error);
    }
  }

  return (
  <div className="signup-container">
      <form className="signup-form" onSubmit={HandleSignup}>
        <h2>Create Account</h2>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e)=>setname(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </label>

        <label>
          Email
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e)=>setemail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </label>

        <button type="submit">Sign Up</button>
        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  )
}

export default Sign
