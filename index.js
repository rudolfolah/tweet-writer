require("dotenv").config();
const express = require("express");
const sanitizeHtml = require("sanitize-html");
const { Configuration, OpenAIApi } = require("openai");
const openaiConfig = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});
const openai = new OpenAIApi(openaiConfig);

/**
 * Removes all HTML tags from the input string.
 * @param input
 * @returns {string|*}
 */
function sanitizeInput(input) {
  return sanitizeHtml(input, {
    allowedTags: [],
    allowedAttributes: [],
  });
}

/**
 * Returns generated text from OpenAI API based on the completion prompt and input.
 * The returned string is sanitized to remove HTML tags.
 * @param prompt
 * @param input
 * @returns {Promise<string|*>}
 */
async function createCompletionTweet(prompt, input) {
  const apiRes = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt + " \"" + input + "\"\n",
    max_tokens: 256,
    temperature: 0.7,
  });
  return sanitizeInput(apiRes.data.choices[0].text);
}

const app = express();

// App configuration
app.use(express.json());
app.set("views", "./views");
app.set("view engine", "ejs");

// App view functions
app.get("/", (req, res) => {
  res.render("index");
});
app.post("/generate", async (req, res) => {
  let apiRes;
  console.log(req.body);
  const input = sanitizeInput(req.body.data);
  const prompts = input.split("\n").filter((p) => p.length > 0).map((p) => p.trim());
  console.log(prompts);
  let results = [];
  try {
    for (let i = 0; i < prompts.length; i++) {
      results.push(await createCompletionTweet("Write a business tweet about", prompts[i]));
      results.push(await createCompletionTweet("Compose a serious tweet about", prompts[i]));
      results.push(await createCompletionTweet("Write a funny tweet about", prompts[i]));
      results.push(await createCompletionTweet("Compose a funny tweet about", prompts[i]));
    }
  } catch (e) {
    console.error("error from the api");
    res.status(500).send({ error: e.message });
    return;
  }
  console.log("sending response", results);
  res.send({ results });
});

// Start the app
const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
