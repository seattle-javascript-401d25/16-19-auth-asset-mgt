
import { Router } from 'express';
import HttpErrors from 'http-errors';
import Profile from '../model/profile';
import bearerAuthMiddleware from '../lib/middleware/bearer-auth-middleware';
import logger from '../lib/logger';

const profileRouter = new Router();

profileRouter.post('/api/profiles', bearerAuthMiddleware, (req, res, next) => {
  if (!req.account) return next(new HttpErrors(400, 'POST PROFILE_ROUTER: INVALID REQ'));
  Profile.init()
    .then(() => {
      return new Profile({
        ...req.body,
        accountId: req.account._id,
      }).save();
    })
    .then((profile) => {
      logger.log(logger.INFO, `POST PROFILE ROUTER: new profile created with 200 code, ${JSON.stringify(profile)}`);
      return res.json(profile);
    })
    .catch(next);
  return undefined;
});

profileRouter.get('/api/profiles/:id?', bearerAuthMiddleware, (req, res, next) => {
  if (!req.account) return next(new HttpErrors(400, 'GET PROFILE ROUTER: INVALID REQ'));
  if (!req.params.id) {
    return Profile.find({})
      .then((profiles) => {
        return res.json(profiles);
      })
      .catch(next);
  }

  Profile.findOne({ _id: req.params.id })
    .then((profile) => {
      if (!profile) return next(new HttpErrors(400, 'PROFILE ROUTER GET: PROFILE NOT FOUND'));
      return res.json(profile);
    })
    .catch(next);
  return undefined;
});

export default profileRouter;
