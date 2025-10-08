import React, { useState } from 'react';
import axios from 'axios';
import JSZip from 'jszip';
import './Website.css';

const Website = () => {
  const [prompt, setPrompt] = useState('');
  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt) return alert('Enter a prompt!');
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/ai/ask-ai', {
        task: 'websitecodegen',
        prompt
      });

      let fullCode = response.data;
      if (typeof fullCode === "object" && fullCode.result) {
        fullCode = fullCode.result;
      }

      fullCode = fullCode.replace(
        /https?:\/\/m\.media\.amazon\.com[^\s'"]+/g,
        'https://picsum.photos/400'
      );


      const styleMatch = fullCode.match(/<style>([\s\S]*?)<\/style>/);
      const scriptMatch = fullCode.match(/<script>([\s\S]*?)<\/script>/);

      setCss(styleMatch ? styleMatch[1] : '');
      setJs(scriptMatch ? scriptMatch[1] : '');
      setHtml(fullCode.replace(/<style>[\s\S]*?<\/style>/, '').replace(/<script>[\s\S]*?<\/script>/, ''));


      const cleanHtml = fullCode.replace(/<style[^>]*>[\s\S]*?<\/style>/i, '').replace(/<script[^>]*>[\s\S]*?<\/script>/i, ''); setHtml(cleanHtml);

    } catch (err) {
      console.error(err);
      alert('Failed to generate website');
    }
    setLoading(false);
  };

  const handleDownload = async () => {
    try {
      const response = await axios.post(
        'http://localhost:5000/ai/download-website',
        { html, css, js },
        { responseType: 'blob' }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = url;
      a.download = 'website.zip';
      a.click();
    } catch (err) {
      console.error(err);
      alert('Failed to download website');
    }
  };

  return (
    <div className="website-container">
      <div className="left-panel">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the website you want..."
        />
        <button onClick={handleGenerate}>{loading ? 'Generating...' : 'Generate Website'}</button>
        {/* <textarea value={html} onChange={(e) => setHtml(e.target.value)} placeholder="HTML output" />
        <textarea value={css} onChange={(e) => setCss(e.target.value)} placeholder="CSS output" />
        <textarea value={js} onChange={(e) => setJs(e.target.value)} placeholder="JS output" /> */}
        <div className="code-area">
          <label>HTML</label>
          <textarea value={html} onChange={(e) => setHtml(e.target.value)} />
        </div>
        <div className="code-area">
          <label>CSS</label>
          <textarea value={css} onChange={(e) => setCss(e.target.value)} />
        </div>
        <div className="code-area">
          <label>JS</label>
          <textarea value={js} onChange={(e) => setJs(e.target.value)} />
        </div>

        <button onClick={handleDownload}>Download Website</button>
      </div>

      <div className="right-panel">
        <iframe
          title="Website Preview"
          srcDoc={`<html><head><style>${css}</style></head><body>${html}<script>${js}</script></body></html>`}
          sandbox="allow-scripts"
        />
      </div>
    </div>
  );
};

export default Website;

