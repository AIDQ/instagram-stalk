const functions = require('firebase-functions');
const express = require('express');
const accountsHandler = require('./app/routes/accounts-handler');

const app = express();
app.use('/accounts', accountsHandler);

// module.exports.instagram = functions.https.onRequest(app);
app.listen(80);
