const { GoogleGenAI } = require('@google/genai');
const express = require('express');
const router = express.Router();
const archiver = require('archiver');
const multer = require('multer')
const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');


const ai = new GoogleGenAI({ apiKey: process.env.WEBSITE_AI_TOKEN });
const upload = multer({ dest: 'uploads/' })

router.post('/ask-ai', async (req, res) => {
  const { task, prompt } = req.body;
  // task = "codegen" | "bug-detect" | "explain" | "resume-analysis"
  // prompt = user ka input

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{
        role: 'user',
        parts: [{
          text: buildPrompt(task, prompt)
        }]
      }]
    });

    let output = response.candidates[0].content.parts[0].text || "";

    if (task === "codegen" || task === "websitecodegen") {
      output = output.replace(/```[a-z]*\n/g, '').replace(/```/g, '');
      res.setHeader('Content-Type', 'text/html');
      return res.send(output);
    }

    res.json({ result: output });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

function buildPrompt(task, userPrompt) {
  switch (task) {
    case "codegen":
      return `Generate a complete working website (HTML + CSS + JS if needed) for: ${userPrompt}.
      Return code only inside a single code block. No explanation.`;
    case "websitecodegen":
      return `Generate a complete working website (HTML + CSS + JS if needed) for: ${userPrompt}. Use placeholder images like https://picsum.photos/400 (do not use Amazon links). Return code only inside a single code block. No explanation.`;
    case "bug-detect":
      return `Find and explain bugs in the following code:\n${userPrompt}\nProvide fixes with explanation.`;
    case "explain":
      return `Explain the following code step by step:\n${userPrompt}`;
    case "resume-analysis":
      return `Analyze this resume text:\n${userPrompt}\nGive strengths, weaknesses, and suggestions.`;
    case "AiSuggestions":
      return `Provide any suggestion to user's query and solve any problem:\n${userPrompt}`;
    case "LangConversion":
      return `if user want to convert any programming language code to another programming langauge then convert the code and provide only code with proper syntax highlighting in single code block do not provide any explanation or anything else :\n${userPrompt}`
    case "databasecode":
      return `Generate sql or code for the following requirement with explanation:\n${userPrompt}`;
    case "difference":
      return `provide difference between two programming languages or technologies:\n${userPrompt}`;
    case "optimize":
      return `optimize the following code for better performance and efficiency:\n${userPrompt}`;
    default:
      return userPrompt;
  }
}

router.post('/upload', upload.single('myfile'), async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).json({ error: "No file uploaded" });

  try {
    let text = "";

    // PDF
    if (file.mimetype === 'application/pdf') {
      const databuffer = fs.readFileSync(file.path);
      const pdfData = await pdfParse(databuffer);
      text = pdfData.text;
    }
    // DOCX
    else if (file.mimetype ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const result = await mammoth.extractRawText({ path: file.path });
      text = result.value;
    }
    else {
      return res.status(400).json({ error: "Unsupported file type" });
    }

    // Call Google GenAI
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{
        role: 'user',
        parts: [{ text: `Analyze this resume text:\n${text}\nGive strengths, weaknesses, and suggestions.` }]
      }]
    });

    const output = response.candidates[0].content.parts[0].text || "";
    res.json({ result: output });

  } catch (error) {
    console.error("Error in /upload:", error);
    res.status(500).json({ error: "Failed to process file or AI call" });
  } finally {
    // Delete uploaded file after processing
    if (file && fs.existsSync(file.path)) fs.unlinkSync(file.path);
  }
});
router.post('/download-website', async (req, res) => {
  const { html, css, js } = req.body; // frontend sends all 3 parts

  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', 'attachment; filename=website.zip');

  const archive = archiver('zip');
  archive.pipe(res);

  archive.append(html, { name: 'index.html' });
  archive.append(css, { name: 'style.css' });
  archive.append(js, { name: 'script.js' });

  archive.finalize();
});

module.exports = router;
