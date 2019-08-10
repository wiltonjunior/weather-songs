'use strict';

const SpotifyController = require('../../../../commons/controllers/spotify.controller');

class PlaylistController extends SpotifyController {
  constructor() {
    super();
    this.PropertyUtils = require('../../../../commons/utils/property.utils');
    this.WeatherFactory = require('../../../../commons/factorys/weather.factory');
  }

  _getGener(temperature) {
    if (temperature > 25) {
      return 'pop';
    } else if (temperature <= 10 && temperature >= 25) {
      return 'rock';
    } else {
      return 'classics';
    }
  }

  async _getPlaylist(temperature, token) {
    const params = this.querystring.stringify({
      min_popularity: 50,
      seed_genres: this._getGener(temperature)
    });

    const response = await this.axios.get(`${this.url}/recommendations?${params}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response;
  }

  async getPlaylistByCity({ params: { city, token } }, res, next) {
    try {
      let playlist = [];
      const { data } = await this.WeatherFactory.getTemperatureByCity(city);
      const temperature = this.PropertyUtils.getValue(data, 'main.temp');
      const response = await this._getPlaylist(temperature, token) || {};
      const tracks = this.PropertyUtils.getValue(response, 'data.tracks');
      if (Array.isArray(tracks)) {
        playlist = tracks.map(({ name, preview_url }) => {
          return { name, preview_url };
        });
      }
      this._sendResponse(res, next, playlist);
    } catch (errr) {
      console.log(errr);
      this._sendResponse(res, next, errr);
    }
  }
}

module.exports = new PlaylistController();
