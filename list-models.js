process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import axios from "axios";
import "dotenv/config";

async function listModels() {
  try {
    const res = await axios.get(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
    );

    console.log("Available Models:\n", res.data);
  } catch (err) {
    console.error("Error:", err.response?.data || err.message);
  }
}

listModels();
