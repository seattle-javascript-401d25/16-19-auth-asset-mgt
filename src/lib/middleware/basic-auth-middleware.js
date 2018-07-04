'use strict';

import HttpErrors from 'http-errors';
import Account from '../../model/account';

export default (req, res, next) => {
  if (!req.headers.authorization) return next(new HttpErrors(400, 'AUTH MW - INVALID REQ'));
  const base64AuthHeader = req.headers.authorization.split('Basic')[1];
  if (!base64AuthHeader) return next(new HttpErrors(400, 'AUTH MW - INVALID REQ'));

  const stringAuthHeader = Buffer.from(base64AuthHeader, 'base64').toString();
  const [username, password] = stringAuthHeader.split(':');
  if (!username || !password) return next(new HttpErrors(400, 'AUTH, INVALID REQ'));

  return Account.findOne({ username })
    .then((account) => {
      if (!account) return next(new HttpErrors(401, 'BASIC AUTH - INVALID REQ'));
      return account.pVerifyPassword(password);
    })
    .then((account) => {
      req.account = account;
      return next();
    })
    .catch(next);
};
