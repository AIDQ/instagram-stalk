import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { InstagramData } from './data/instagram';

const credentialsFile = path.join(__dirname, '../../instagram.credentials.json');
const credentials = JSON.parse(fs.readFileSync(credentialsFile, 'utf-8'));

const instagram = new InstagramData()
  .login(credentials.username, credentials.password);

export function accountsHandler(req: express.Request, res: express.Response) {
  let ids = req.query.id;
  if (!ids) {
    ids = [];
  }
  if (!Array.isArray(ids)) {
    ids = [ids];
  }

  instagram
    .then((ig) => {
      const accounts = ids.map((id: string) => ig.getAccountById(id));
      return Promise.all(accounts);
    })
    .then((accounts) => {
      res.json({
        success: true,
        accounts: accounts
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        error: err,
      });
    });
}
