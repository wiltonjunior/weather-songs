'use strict';

const BaseRouter = require('../../../commons/router/base.router');

class CityRouter extends BaseRouter {
  constructor() {
    super();
    this.controller = require('./controllers/city.controller');
  }

  initialize() {
    this.get('/temperature/:city', this.controller.getTemperatureByCity);
  }
}

module.exports = new CityRouter().getRouter();
