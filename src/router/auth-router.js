import { Router } from 'express';
import HttpErrors from 'http-errors';
import Account from '../model/account';
import basicAuthMiddleware from '../lib/middleware/basic-auth-middleware';
import logger from '../lib/logger';

const authRouter = new Router();

authRouter.post('/api/signup', (req, res, next) => {
  return Account.create(req.body.username, req.body.email, req.body.password)
    .then((account) => {
      delete req.body.password;
      logger.log(logger.INFO, 'AUTH_ROUTER /api/signup: Creating Token');
      return account.pCreateToken();
    })
    .then((token) => {
      logger.log(logger.INFO, `AUTH_ROUTER /api/signup: returning 200 code and token ${token}`);
      return res.json({ token });
    })
    .catch(next);
});

authRouter.get('/api/login', basicAuthMiddleware, (req, res, next) => {
  if (!req.account) return next(new HttpErrors(400, 'AUTH_ROUTER: INVAILID REQ'));
  return req.account.pCreateToken()
    .then((token) => {
      logger.log(logger.INFO, `AUTH_ROUTER /api/login - RES with 200 status code and token ${token}`);
      return res.json({ token });
    })
    .catch(next);
});

export default authRouter;
