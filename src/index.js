'use strict';

require('dotenv').config();
const express = require('express');

class App {
  constructor() {
    this.httpPort = process.env.PORT;
    this.express = express();
    this.cors = require('cors');
    this.cookieParser = require('cookie-parser');
    this.logger = require('./commons/logger/logger');

    this.middlewares();
    this.routes();
    this.initialize();
  }

  middlewares() {
    this.express.use(this.cors());
    this.express.use(this.cookieParser());
    this.express.use(express.json());
    this.express.use(express.static('public'));
    this.express.get('/', (req, res) =>
      res.sendFile(`${process.cwd()}/public/index.html`)
    );
  }

  routes() {
    const Routes = require('./api/routes');
    Routes.initialize(this.express);
  }

  async initialize() {
    try {
      this.logger.info('Starting API server');
      this.express.listen(this.httpPort);
      this.logger.info('APP has started | port:', this.httpPort);
    } catch (err) {
      this.logger.error(err);
    }
  }
}

module.exports = new App();
