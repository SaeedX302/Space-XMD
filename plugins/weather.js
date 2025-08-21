// plugins/weather.js

const axios = require('axios');

module.exports = {
  name: 'weather',
  description: 'Gets the current weather for a specified city.',
  async execute(message, args) {
    if (args.length === 0) {
      return message.reply('Please provide a city name! Usage: !weather <city>');
    }

    const city = args.join(' ');
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(url);
      const weather = response.data;

      const weatherReport = `
*Weather in ${weather.name}, ${weather.sys.country}* 🌍

🌡️ *Temperature:* ${weather.main.temp}°C
🤔 *Feels like:* ${weather.main.feels_like}°C
💧 *Humidity:* ${weather.main.humidity}%
🌬️ *Wind Speed:* ${weather.wind.speed} m/s
☁️ *Condition:* ${weather.weather[0].description}

Stay safe and have a great day! ☀️
      `;

      message.reply(weatherReport);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        message.reply(`Sorry, I couldn't find the city "${city}". Please check the spelling.`);
      } else {
        message.reply('Oops! I couldn\'t fetch the weather right now. 😔');
      }
    }
  },
};
