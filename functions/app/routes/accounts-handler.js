const fs = require('fs');
const path = require('path');
const InstagramData = require('../data/instagram');

const credentialsFile = path.join(__dirname, '../../instagram.credentials.json');
const credentials = JSON.parse(fs.readFileSync(credentialsFile));

const instagram = new InstagramData()
  .login(credentials.username, credentials.password);

function accountsHandler(req, res) {
  let ids = req.query.id;
  if (ids) {
    if (!Array.isArray(ids)) {
      ids = [ids];
    }

    instagram
      .then((ig) => {
        const accounts = ids.map((id) => ig.getAccountById(id));
        return Promise.all(accounts);
      })
      .then((accounts) => {
        res.json(accounts);
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  } else {
    res.json([]);
  }
}

module.exports = accountsHandler;
