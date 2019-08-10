'use strict';

const BaseRouter = require('../../../commons/router/base.router');

class PlaylistRouter extends BaseRouter {
  constructor() {
    super();
    this.controller = require('./controllers/playlist.controller');
  }

  initialize() {
    this.get('/:token/:city', this.controller.getPlaylistByCity);
  }
}

module.exports = new PlaylistRouter().getRouter();
