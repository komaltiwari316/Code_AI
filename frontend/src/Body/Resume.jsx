import React, { useState } from 'react';
import axios from 'axios';
import './Resume.css';

const Resume = () => {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleAnalysis = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please upload a PDF or DOCX file");

    const formData = new FormData();
    formData.append('myfile', file);

    try {
      setLoading(true);
      const { data } = await axios.post('http://localhost:5000/ai/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setAnalysis(data.result);
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Analysis failed. Check backend logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="left">
        <textarea
          value={analysis}
          readOnly
          placeholder="Analysis output will appear here..."
        />
      </div>

      <form className="upload-form" onSubmit={handleAnalysis}>
        <input
          type="file"
          name="myfile"
          accept=".pdf,.docx"
          onChange={handleFileChange}
        /><br /><br />
        <button type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </form>
    </div>
  );
};

export default Resume;
