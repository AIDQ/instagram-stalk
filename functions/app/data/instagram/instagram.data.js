const request = require('request-promise-native');
const endpoints = require('./endpoints');

class InstagramData {
  constructor() {
    this._jar = request.jar();
    this.loggedIn = false;
  }

  login(username, password) {
    return request
      .get(endpoints.baseUrl, {
        jar: this._jar,
      })
      .then(() => {
        const cookies = {};
        this._jar.getCookies(endpoints.baseUrl)
          .forEach((x) => cookies[x.key] = x.value);
        return cookies;
      })
      .then((cookies) => {
        return request.post(endpoints.loginUrl, {
          jar: this._jar,
          json: true,
          headers: {
            'referer': `${endpoints.baseUrl}/`,
            'x-csrftoken': cookies.csrftoken,
          },
          form: { username, password },
        })
      })
      .then((res) => {
        if (res.authenticated && res.user) {
          this.loggedIn = true;
        }
        return Promise.resolve(this);
      });
  }

  getAccountByUsername(username) {
    return request
      .get(endpoints.getAccountJsonUrl(username), {
        jar: this._jar,
        json: true
      })
      .then((r) => r.user)
      .catch((err) => {
        const statusCode = err.response.statusCode;
        return Promise.reject(
          `Unable to get user '${username}'. ` +
          `Instagram responded with status code ${statusCode}.`
        )
      });
  }

  getAccountById(id) {
    if (!this.loggedIn) {
      return Promise.reject('getAccountById rquires authentication.');
    }
    return request
      .get(endpoints.getFollowUrl(id), {
        jar: this._jar,
        followRedirect: false,
      })
      .catch((err) => {
        const response = err.response;
        const statusCode = response.statusCode;

        if (statusCode >= 400) {
          return Promise.reject(
            `Unable to get user with id '${id}'. ` +
            `Instagram responded with status code ${statusCode}.`
          );
        }
        const redirectUrl = response.headers.location;
        const username = redirectUrl.split('/').slice(-2)[0];

        return this.getAccountByUsername(username);
      });
  }
}

module.exports = InstagramData;
