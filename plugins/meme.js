// plugins/meme.js

const axios = require('axios');

module.exports = {
  name: 'meme',
  description: 'Creates a meme with custom text on a popular template.',
  async execute(message, args) {
    try {
      const memeArgs = args.join(' ').split(';');
      if (memeArgs.length < 2) {
        return message.reply('Invalid format! Use: !meme <template_name>;<text1>;<text2>');
      }

      const templateName = memeArgs[0].trim().toLowerCase();
      const text1 = memeArgs[1].trim();
      const text2 = memeArgs.length > 2 ? memeArgs[2].trim() : '';

      // Get meme templates
      const response = await axios.get('https://api.imgflip.com/get_memes');
      const memes = response.data.data.memes;

      // Find the template
      const template = memes.find(m => m.name.toLowerCase().includes(templateName));
      if (!template) {
        return message.reply(`Template "${templateName}" not found. Try another one!`);
      }

      // Create the meme
      const params = new URLSearchParams();
      params.append('template_id', template.id);
      params.append('username', process.env.IMGFLIP_USERNAME);
      params.append('password', process.env.IMGFLIP_PASSWORD);
      params.append('text0', text1);
      params.append('text1', text2);

      const memeResponse = await axios.post('https://api.imgflip.com/caption_image', params);
      const memeData = memeResponse.data;

      if (memeData.success) {
        message.reply({
          image: { url: memeData.data.url },
          caption: `Here's your meme, master! ✨`
        });
      } else {
        message.reply(`Oops! Something went wrong: ${memeData.error_message}`);
      }
    } catch (error) {
      console.error(error);
      message.reply('Sorry, I couldn\'t create the meme. 😔');
    }
  },
};
