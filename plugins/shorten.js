// plugins/shorten.js

const axios = require('axios');

module.exports = {
  name: 'shorten',
  description: 'Shortens a given URL.',
  async execute(message, args) {
    const longUrl = args[0];

    if (!longUrl) {
      return message.reply('Please provide a URL to shorten. \nExample: `!shorten https://example.com`');
    }

    try {
      const response = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longUrl)}`);
      const shortUrl = response.data;
      message.reply(`Here is your shortened URL: ${shortUrl}`);
    } catch (error) {
      console.error('Error shortening URL:', error);
      message.reply('Sorry, I couldn\'t shorten that URL. Please try again later.');
    }
  },
};
