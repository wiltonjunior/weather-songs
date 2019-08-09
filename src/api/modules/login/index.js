'use strict';

const BaseRouter = require('../../../commons/router/base.router');

class LoginRouter extends BaseRouter {
  constructor() {
    super();
    this.controller = require('./controllers/login.controller');
  }

  initialize() {
    this.get('/', this.controller.getAuthorize);
  }
}

module.exports = new LoginRouter().getRouter();
