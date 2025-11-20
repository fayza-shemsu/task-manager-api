import dotenv from "dotenv";
dotenv.config();

import { TextServiceClient } from "@google-ai/generativelanguage";

const client = new TextServiceClient({
  apiKey: process.env.GEMINI_API_KEY,
});

async function main() {
  try {
    console.log("Connecting to Gemini API...");

    const request = {
      model: "models/gemini-2.5-flash", // Make sure this matches your list-models.js
      prompt: {
        text: "Write a short motivational message for a developer learning Node.js.",
      },
      maxOutputTokens: 200,
      temperature: 0.7,
    };

    const [response] = await client.generateText(request);

    console.log("✅ Response from Gemini:");
    console.log(response.candidates[0].content);
  } catch (error) {
    console.error("❌ Error calling Gemini API:", error.code, error.details);
    console.error(error); // Full error for debugging
  }
}

main();
