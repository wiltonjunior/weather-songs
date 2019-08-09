'use strict';

const SpotifyController = require('../../../../commons/controllers/spotify.controller');

class TokenController extends SpotifyController {
  getToken({ query: { code, state }, cookies }, res) {
    var storedState = cookies ? cookies[this.stateKey] : null;
    if (state === null || state !== storedState) {
      res.redirect('/#' +
        this.querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {
      res.clearCookie(this.stateKey);

      const params = this.querystring.stringify({
        code,
        redirect_uri: this.redirect_uri,
        grant_type: 'authorization_code'
      });

      this.axios.post(`${this.url_accounts}/api/token`, params, {
        headers: {
          'Content-type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${Buffer.from(`${this.client_id}:${this.client_secret}`).toString('base64')}`
        }
      }).then(({ data }) => {
        const { access_token } = data;
        res.redirect('/playlist/#' + this.querystring.stringify({ access_token }));
      }).catch(err => {
        console.log(err);
      });
    }
  }
}

module.exports = new TokenController();
