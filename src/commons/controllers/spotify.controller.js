
'use strict';

const HttpController = require('./http.controller');

class SpotifyController extends HttpController {
  constructor() {
    super();
    this.axios = require('axios');
    this.stateKey = 'spotify_auth_state';
    this.querystring = require('querystring');
    this.scope = process.env.SPOTIFY_SCOPE;
    this.client_id = process.env.SPOTIFY_ID;
    this.client_secret = process.env.SPOTIFY_SECRET;
    this.url_accounts = process.env.SPOTIFY_URL_ACCOUNT;
    this.redirect_uri = process.env.SPOTIFY_URL_REDIRECT;
  }
}

module.exports = SpotifyController;
