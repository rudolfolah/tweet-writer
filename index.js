require("dotenv").config();
const config = require("./config");
const express = require("express");
const sanitizeHtml = require("sanitize-html");
const {OpenAI} = require("openai");

const openai = new OpenAI();

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
  const apiRes = await openai.chat.completions.create({
    model: config.completionModel,
    max_tokens: config.completionMaxTokens,
    temperature: config.completionTemperature,
    messages: [
      {
        role: "system",
        content: config.systemPrompt,
      },
      {
        role: "user",
        content: prompt + " \"" + input + "\"\n",
      },
    ],
  });
  console.log(apiRes.choices[0].message.content);
  return sanitizeInput(apiRes.choices[0].message.content);
}

/**
 * Returns a rewritten version of the input string.
 * @param input
 * @returns {Promise<string[]|*>}
 */
async function createRewriteTweets(input) {
  const apiRes = await openai.chat.completions.create({
    model: config.completionModel,
    max_tokens: config.completionMaxTokens,
    temperature: config.completionTemperature,
    messages: [
      {
        role: "system",
        content: config.systemPrompt,
      },
      {
        role: "user",
        content: config.completionRewritePrompt + " \"" + input + "\"\n",
      },
    ],
  });
  console.log(apiRes.choices[0].message.content);
  return sanitizeInput(apiRes.choices[0].message.content).split("\n").filter((p) => p.length > 0).map((s) => s.slice(2));
}

const app = express();

// App configuration
app.use(express.json());
app.use(express.static("webui/build"));

// App view functions
app.get("/", (req, res) => {
  res.render("index");
});
app.post("/generate", async (req, res) => {
  let apiRes;
  console.log(req.body);
  const includeRewrites = req.body.includeRewrites;
  const input = sanitizeInput(req.body.data);
  const prompts = input.split("\n").filter((p) => p.length > 0).map((p) => p.trim());
  console.log(prompts);
  let results = [];
  try {
    for (let prompt of prompts) {
      for (let completion of config.completionPrompts) {
        results.push(await createCompletionTweet(completion, prompt));
      }
    }
  } catch (e) {
    console.error("error from the api: " + e.message);
    res.status(500).send({error: e.message});
    return;
  }

  if (includeRewrites && results.length > 0) {
    const rewrites = await createRewriteTweets(results[0]);
    for (let rewrite of rewrites) {
      results.push(rewrite);
    }
  }

  console.log("sending response", results);
  res.send({results});
});

// Start the app
const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
