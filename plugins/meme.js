// plugins/meme.js

const axios = require('axios');

// Replace with your Imgflip username and password
const IMGFLIP_USERNAME = tsuncca19@edumail.edu.rs;
const IMGFLIP_PASSWORD = @1234567#;

module.exports = {
  name: 'meme',
  description: 'Generates a meme with the given text.',
  async execute(message, args) {
    const [templateId, topText, bottomText] = args;

    if (!templateId || !topText || !bottomText) {
      return message.reply('Please provide a template ID, top text, and bottom text. \nExample: `!meme 102156234 "Top Text" "Bottom Text"`');
    }

    try {
      const params = new URLSearchParams();
      params.append('template_id', templateId);
      params.append('username', IMGFLIP_USERNAME);
      params.append('password', IMGFLIP_PASSWORD);
      params.append('text0', topText);
      params.append('text1', bottomText);

      const response = await axios.post('https://api.imgflip.com/caption_image', params);
      const { data } = response.data;

      if (data.url) {
        message.reply({
          image: { url: data.url },
          caption: 'Here is your meme!',
        });
      } else {
        message.reply('Sorry, I couldn\'t generate the meme. Please check the template ID.');
      }
    } catch (error) {
      console.error('Error generating meme:', error);
      message.reply('Sorry, there was an error generating the meme. Please try again later.');
    }
  },
};
