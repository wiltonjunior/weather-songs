
'use strict';

class WeatherFactory {
  constructor() {
    this.axios = require('axios');
    this.querystring = require('querystring');
    this.url = process.env.WEATHER_URL;
    this.appId = process.env.WEATHER_APPID;
  }

  async getTemperatureByCity(city) {
    const params = this.querystring.stringify({
      q: city,
      units: 'metric',
      appid: this.appId
    });
    const response = await this.axios.get(`${this.url}/weather?${params}`)
    return response;
  }
}

module.exports = new WeatherFactory();
