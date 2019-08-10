'use strict';

const SpotifyController = require('../../../../commons/controllers/spotify.controller');

class PlaylistController extends SpotifyController {
  constructor() {
    super();
    this.PropertyUtils = require('../../../../commons/utils/property.utils');
    this.WeatherFactory = require('../../../../commons/factorys/weather.factory');
  }

  async _me(token) {
    const response = await this.axios.get(`${this.url}/me`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response;
  }

  async getProfile({ params: { token } }, res, next) {
    try {
      const response = await this._me(token) || {};
      this._sendResponse(res, next, response.data);
    } catch (errr) {
      console.log(errr);
      this._sendResponse(res, next, errr);
    }
  }
}

module.exports = new PlaylistController();
