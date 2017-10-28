import * as express from 'express';
import { InstagramData } from '../data/instagram';

function _queryToArray(q: any) {
  let arr = q;
  if (!arr) arr = [];
  if (!Array.isArray(arr)) arr = [arr];
  return arr as string[];
}

export function getAccountsHandler(req: express.Request, res: express.Response) {
  const igUsername = req.header('x-ig-username');
  const igPassword = req.header('x-ig-password');

  if (!igUsername || !igPassword) {
    return res.json({
      success: false,
      error: `Provide 'x-ig-username' and 'x-ig-password' in header.`
    });
  }

  const instagram = new InstagramData(igUsername, igPassword);

  const ids = _queryToArray(req.query.id);
  const usernames = _queryToArray(req.query.u);

  const byId = ids.map((id) => instagram.getAccountById(id));
  const byUsername = usernames.map((u) => instagram.getAccountByUsername(u));

  return Promise.all(byId.concat(byUsername))
    .then((accounts) => {
      res.json({
        success: true,
        accounts: accounts
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        error: err
      });
    });
}
