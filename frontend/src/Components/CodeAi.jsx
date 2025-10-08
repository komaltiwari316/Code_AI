import React from "react";
import "./CodeAi.css";
import bgVideo from "./gif.mp4"; 
import { Link } from "react-router-dom";

const CodeAi = () => {
  return (
    <div className="video-background-container">
      {/* Background Video */}
      <video autoPlay muted loop className="bg-video">
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div className="code-ai-container">
        <header className="code-ai-header">
          <h1 className="code-ai-title">Code AI</h1>
          <p className="code-ai-sub">Your AI-powered coding assistant</p>
        </header>

        <main className="code-ai-main">
          <section className="about">
            <p>
              Welcome to <strong>Code AI</strong> — a simple tool that generates boilerplate
              code for your projects. Describe what you want, pick a target (React, Node.js, or
              plain text), and let AI handle the heavy lifting.
            </p>
          </section>
        </main>

        <footer className="code-ai-footer">
          Built with AI 🤖 and make your work easy with ❤️ <br />
           for Any Suggestion talk to with  <Link to="/AI" className="ai-links">AI</Link>....
        </footer>
      </div>
    </div>
  );
};

export default CodeAi;
