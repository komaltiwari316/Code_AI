import React from 'react'
import { Link } from 'react-router-dom'
import './Login.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const navigate = useNavigate();

  const HandleLogin=async(e)=>{
    e.preventDefault();
    try{
      const res=await axios.post("https://code-ai-backend-n8lb.onrender.com/User/login",{
        email,
        password
      });  
      alert("login successfully");
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate('/code-generation');
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={HandleLogin}>
        <h2>Login</h2>

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

        <button type="submit">Login</button>

        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  )
}

export default Login
