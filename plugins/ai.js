// plugins/ai.js

const axios = require('axios');

module.exports = {
  name: 'ai',
  description: 'Asks a question to the TSun AI.',
  async execute(message, args) {
    if (args.length === 0) {
      return message.reply('Aap ne koi sawaal hi nahi pucha! Usage: !ai <question>');
    }

    const question = encodeURIComponent(args.join(' '));
    const apiKey = 'prince'; // As provided in the URL
    const url = `https://princeaiapi.vercel.app/prince/api/v1/ask?key=${apiKey}&ask=${question}`;

    try {
      const response = await axios.get(url);
      const data = response.data;

      if (data.status === 'success' && data.message && data.message.content) {
        const reply = data.message.content;
        message.reply(`*🤖 TSun AI says:*\n\n${reply}`);
      } else {
        message.reply('Sorry, AI se ajeeb sa response mila hai. 😕');
      }
    } catch (error) {
      console.error("TSun AI API Error:", error);
      message.reply('Sorry, mera AI dimagh abhi thora slow chal raha hai. 😔 Baad mein try karein.');
    }
  },
};
