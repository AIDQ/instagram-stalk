const request = require('request-promise-native');
const endpoints = require('./endpoints');

class InstagramData {
  constructor() {
    this._jar = request.jar();
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
          headers: {
            'referer': `${endpoints.baseUrl}/`,
            'x-csrftoken': cookies.csrftoken,
          },
          form: { username, password },
        })
      })
      .then(() => this)
      .catch((err) => Promise.reject(`Failed to login`));
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
          `Unable to get user ${username}.` +
          `Instagram responded with status code ${statusCode}.`
        )
      });
  }

  getAccountById(id) {
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
            `Unable to get user with id ${id}. ` +
            `Instagram responded with status code ${statusCode}.`
          );
        }
        if (statusCode < 300) {
          return Promise.reject(
            `Unable to get user with id ${id}. ` +
            `Instagram didn't redirect to useer's profile.`
          );
        }
        const redirectUrl = response.headers.location;
        const username = redirectUrl.split('/').slice(-2)[0];

        return this.getAccountByUsername(username);
      });
  }
}

module.exports = InstagramData;
