import React, { useEffect, useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [username,setusername]=useState("");

  useEffect(()=>{
    const User=localStorage.getItem("user");
    if(User){
      const parsedUser = JSON.parse(User);
      setusername(parsedUser.name); 
    }
  },[])

  const handlelogout=()=>{
    localStorage.removeItem("user");
    setusername("");
  }
  return (
    <div>
      {/* Main Navbar */}
      <nav className="navbar">
        <div className="left-section">
          <div className="logo">
            <img 
              src="https://img.freepik.com/premium-photo/minimalist-silver-ai-logo-black-background_1029370-8033.jpg" 
              alt="AI Logo" 
            />
          </div>
          <ul className="nav-links">
            <li><Link to="/">Code AI</Link></li>
            <li><Link to="/contact-us">Contact Us</Link></li>
            {username ? (
              <>
                <li>hello,{username}</li>
                <li><button onClick={handlelogout}>Logout</button></li>
              </>
            ) : (
              <>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/signup">Sign Up</Link></li>
              </>
            )}
          </ul>
        </div>
      </nav>

      {/* Sub Navbar */}
      <div className="sub-navbar">
        <ul className="sub-nav-links">
          <li><Link to="/code-generation">Code Generation</Link></li>
          <li><Link to="/bug-detector">Bug Detector</Link></li>
          <li><Link to="/code-explanations">Code Explanations</Link></li>
          <li><Link to="/resume-analysis">Resume Analysis</Link></li>
          <li><Link to="/LangCon">Language Conversion</Link></li>
          <li><Link to='/databasecode'>Database Code</Link></li>
          <li><Link to='/difference'>Any Difference</Link></li>
          <li><Link to='/optimize'>Optimize Code</Link></li>
          <li><Link to='/website'>Website Generator</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
