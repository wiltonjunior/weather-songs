'use strict';

const HttpController = require('../../../../commons/controllers/http.controller');

class CityController extends HttpController {
  constructor() {
    super();
    this.WeatherFactory = require('../../../../commons/factorys/weather.factory');
  }
  async getTemperatureByCity({ params: { city } }, res, next) {
    const { data } = await this.WeatherFactory.getTemperatureByCity(city);
    this._sendResponse(res, next, data);
  }
}

module.exports = new CityController();
