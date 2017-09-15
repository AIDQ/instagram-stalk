import * as functions from 'firebase-functions';
import * as express from 'express';
import { accountsHandler } from './app/accounts-handler';

const app = express();
app.get('/instagram/accounts', accountsHandler);

// app.listen(80);
module.exports.instagram = functions.https.onRequest(app);
