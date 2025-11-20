import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

// Load your key
const apiKey = process.env.GOOGLE_API_KEY;

// Create client
const genAI = new GoogleGenerativeAI(apiKey);

// Prepare model
export const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

// Example AI function for task suggestions
export async function generateTaskSuggestion(prompt) {
  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini AI Error:", error.message);
    return null;
  }
}
