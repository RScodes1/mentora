require('dotenv').config()
const fetch = require("node-fetch");

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  fetch: fetch
});

exports.summarize = async (req, res) => {
  try {

    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    if (text.length < 50) {
      return res.status(400).json({ message: "Text too short" });
    }

    if (text.length > 10000) {
      return res.status(413).json({ message: "Text too large" });
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Summarize the text into 3-6 bullet points"
        },
        {
          role: "user",
          content: text
        }
      ]
    });

    const summary = response.choices[0].message.content;

    res.json({
      summary,
      model: "gpt-4o-mini"
    });

  } catch (err) {

    console.error(err);

    res.status(502).json({
      message: "LLM summarization failed"
    });

  }
};