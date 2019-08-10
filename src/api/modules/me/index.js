'use strict';

const BaseRouter = require('../../../commons/router/base.router');

class MeRouter extends BaseRouter {
  constructor() {
    super();
    this.controller = require('./controllers/me.controller');
  }

  initialize() {
    this.get('/:token', this.controller.getProfile);
  }
}

module.exports = new MeRouter().getRouter();
