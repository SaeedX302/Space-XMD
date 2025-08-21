// plugins/ai.js

const { GoogleGenerativeAI } = require("@google/generative-ai");

module.exports = {
  name: 'ai',
  description: 'Asks a question to the Gemini AI.',
  async execute(message, args) {
    if (args.length === 0) {
      return message.reply('Aap ne koi sawaal hi nahi pucha! Usage: !ai <question>');
    }

    const prompt = args.join(' ');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      message.reply(`*🧠 Gemini AI says:*\n\n${text}`);
    } catch (error) {
      console.error("Gemini AI Error:", error);
      message.reply('Sorry, my AI brain is a bit fuzzy right now. 😔 Try again later.');
    }
  },
};
