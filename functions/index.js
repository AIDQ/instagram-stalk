const functions = require('firebase-functions');
const express = require('express');
const accountsHandler = require('./app/routes/accounts-handler');

const app = express();
app.use('/accounts', accountsHandler);

// app.listen(80);
module.exports.instagram = functions.https.onRequest(app);
