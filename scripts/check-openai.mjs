import nextEnv from "@next/env";
import OpenAI from "openai";

const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());

const apiKey = process.env.OPENAI_API_KEY?.trim();
const model = process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";

if (!apiKey || apiKey === "your_openai_api_key_here") {
  console.error("OPENAI_API_KEY is missing. Add your key to .env.local first.");
  process.exitCode = 1;
} else {
  try {
    const client = new OpenAI({ apiKey });
    const response = await client.responses.create({
      model,
      input: "Reply with exactly the word READY.",
      max_output_tokens: 16,
      store: false,
    });

    console.log(`OpenAI API connection succeeded with model ${model}.`);
    console.log(`Response: ${response.output_text.trim()}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown OpenAI error.";
    console.error(`OpenAI API connection failed: ${message}`);
    process.exitCode = 1;
  }
}
