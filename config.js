module.exports = {
  completionPrompts: [
    "Write a tweet for a consulting business audience about",
    "Write a tweet that enthusastically promotes",
    "A tweet that simplifies the concepts of",
    "Write a business tweet about",
    "Compose a serious tweet about",
    "Write a funny tweet about",
    "Compose a funny tweet about",
  ],
  completionRewritePrompt: "Please rewrite this tweet, and then do it again 3 more times",
  completionModel: "gpt-3.5-turbo",
  completionMaxTokens: 256,
  completionTemperature: 0.8,
  systemPrompt: "You are a helpful AI assistant. Write a tweet that will help the user.",
}
