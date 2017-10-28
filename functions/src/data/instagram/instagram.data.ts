import * as request from 'request';
import * as requestPromise from 'request-promise-native';
import endpoints from './endpoints';

export class InstagramData {
  private _jar: request.CookieJar;
  private _loggedIn: Promise<void>;

  constructor(username: string, password: string) {
    this._jar = requestPromise.jar();
    this._loggedIn = this._login(username, password);
  }

  private _getCookiesAsKeyValues() {
    const cookies: any = {};
    (this._jar.getCookies(endpoints.baseUrl) as any[])
      .forEach(x => cookies[x.key] = x.value);
    return cookies;
  }

  private _login(username: string, password: string) {
    return requestPromise
      .get(endpoints.baseUrl, {
        jar: this._jar,
      })
      .then(() => {
        return requestPromise
          .post(endpoints.loginUrl, {
            jar: this._jar,
            json: true,
            headers: {
              'referer': endpoints.baseUrl + '/',
              'x-csrftoken': this._getCookiesAsKeyValues().csrftoken,
            },
            form: { username, password },
          })
          .then((body: any) => {
            if (!body.authenticated && body.user) {
              return Promise.reject(`Invalid password for '${username}'.`);
            }

            if (!body.authenticated && !body.user) {
              return Promise.reject('Invalid username and/or password.');
            }

            return Promise.resolve();
          });
      });
  }

  getAccountByUsername(username: string) {
    return this._loggedIn
      .then(() => {
        return requestPromise
          .get(endpoints.getAccountJsonUrl(username), {
            jar: this._jar,
            json: true,
          })
          .then((r) => r.user)
          .catch((err) => {
            const statusCode = err.response.statusCode;

            return Promise.reject(
              `Unable to get account with username '${username}'. ` +
              `Instagram responded with status code ${statusCode}.`
            );
          });
      });
  }

  getAccountById(id: number | string) {
    return this._loggedIn
      .then(() => {
        return requestPromise
          .get(endpoints.getFollowUrl(id), {
            jar: this._jar,
            simple: false,
            followRedirect: false,
            resolveWithFullResponse: true,
          })
          .then((response: request.RequestResponse) => {
            const statusCode = response.statusCode;
            if (statusCode !== 302) {
              return Promise.reject(
                `Unable to get account with id '${id}'. ` +
                `Instagram responded with status code ${statusCode}.`,
              );
            }

            const redirectUrl = response.headers.location;
            const username = (redirectUrl as string).split('/').slice(-2)[0];

            return this.getAccountByUsername(username);
          });
      });
  }
}
