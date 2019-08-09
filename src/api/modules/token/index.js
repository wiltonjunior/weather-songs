'use strict';

const BaseRouter = require('../../../commons/router/base.router');

class TokenRouter extends BaseRouter {
  constructor() {
    super();
    this.controller = require('./controllers/token.controller');
  }

  initialize() {
    this.get('/', this.controller.getToken);
  }
}

module.exports = new TokenRouter().getRouter();
