require("dotenv").config();
const { GoogleGenAI } = require("@google/genai");
const express = require("express");
const cors = require("cors");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const app = express();
app.use(cors());
app.use(express.json());
app.get("/test", (req, res) => {
  res.send("Backend is working!");
});

app.post("/correct", async (req, res) => {

  const code = req.body.code;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
Fix the following code and explain the errors in simple language:

${code}
`,
  });

  res.send(response.text);

});

async function testGemini() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Say Hello from Gemini",
    });

    console.log(response.text);

  } catch (error) {
    console.log("Gemini Error:");
    console.log(error);
  }
}
testGemini();
app.listen(5000, () => {
  console.log("Server is running on port 5000");
  
});