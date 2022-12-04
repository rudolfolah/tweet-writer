# Tweet Writer

Given an article or some paragraphs, this program will write a list of tweets for you.

Requires an OpenAI API key: https://beta.openai.com/account/api-keys

## Usage

Set up your `.env` file:

```
OPEN_AI_API_KEY="api goes here"
SERVER_PORT=3000
```

```bash
npm install
npm start
```

## Development

The web pages use EJS (Embedded JS) templates. The layout has a header and footer.

The styling is done with Tailwind CSS. The base style is in "views/_header.ejs" in a `<style>` tag.
