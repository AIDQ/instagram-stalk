import * as request from 'request';
import * as requestPromise from 'request-promise-native';
import endpoints from './endpoints';

export class InstagramData {
  private _jar: request.CookieJar;
  private loggedIn: boolean;

  constructor() {
    this._jar = requestPromise.jar();
    this.loggedIn = false;
  }

  login(username: string, password: string) {
    return requestPromise
      .get(endpoints.baseUrl, {
        jar: this._jar,
      })
      .then(() => {
        const cookies: any = {};
        this._jar.getCookies(endpoints.baseUrl)
          .forEach((x: any) => cookies[x.key] = x.value);
        return cookies;
      })
      .then((cookies) => {
        return requestPromise.post(endpoints.loginUrl, {
          jar: this._jar,
          json: true,
          headers: {
            'referer': `${endpoints.baseUrl}/`,
            'x-csrftoken': cookies.csrftoken,
          },
          form: { username, password },
        });
      })
      .then((res) => {
        if (res.authenticated && res.user) {
          this.loggedIn = true;
        }
        return Promise.resolve(this);
      });
  }

  getAccountByUsername(username: string) {
    return requestPromise
      .get(endpoints.getAccountJsonUrl(username), {
        jar: this._jar,
        json: true,
      })
      .then((r) => r.user)
      .catch((err) => {
        const statusCode = err.response.statusCode;
        return Promise.reject(
          `Unable to get user '${username}'. ` +
          `Instagram responded with status code ${statusCode}.`
        );
      });
  }

  getAccountById(id: number | string) {
    if (!this.loggedIn) {
      return Promise.reject('getAccountById rquires authentication.');
    }
    return requestPromise
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
            `Instagram responded with status code ${statusCode}.`,
          );
        }
        const redirectUrl = response.headers.location;
        const username = redirectUrl.split('/').slice(-2)[0];

        return this.getAccountByUsername(username);
      });
  }
}
