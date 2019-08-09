'use strict';

const SpotifyController = require('../../../../commons/controllers/spotify.controller');

class LoginController extends SpotifyController {
  _generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  getAuthorize(req, res, next) {
    let state = this._generateRandomString(16);
    res.cookie(this.stateKey, state);
    res.redirect(`${this.url_accounts}/authorize?` +
      this.querystring.stringify({
        state: state,
        scope: this.scope,
        response_type: 'code',
        client_id: this.client_id,
        redirect_uri: this.redirect_uri
      }));
    next();
  }
}

module.exports = new LoginController();
