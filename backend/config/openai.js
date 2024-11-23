// const { Configuration, OpenAIApi } = require('openai');
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

module.exports = { openai };
