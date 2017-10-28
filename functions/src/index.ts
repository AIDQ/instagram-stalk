import * as functions from 'firebase-functions';
import * as express from 'express';
import { getAccountsHandler } from './app/accounts-handler';

const app = express();
app.get('/instagram/accounts', getAccountsHandler);

module.exports.instagram = functions.https.onRequest(app);
