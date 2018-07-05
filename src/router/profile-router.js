
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

profileRouter.get('/api/profiles/:id?', (req, res, next) => {
  if (!req.account) return next(new HttpErrors(400, 'GET PROFILE ROUTER: invalid req'));

  if (!req.params.id) {
    return Profile.find({})
      .then((profiles) => {
        return res.json(profiles);
      })
      .catch(next);
  }
  Profile.init()
    .then(() => {
      return Profile.findOne({ _id: req.params.id });
    })
    .then((profile) => {
      logger.log(logger.INFO, `Model Router: AFTER getting model: ${JSON.stringify(profile)}`);    
      return res.json(profile);
    })
  // Profile.findOne({ _id: req.params.id })
  //   .then((profile) => {
  //     if (!profile) return next(new HttpErrors(400, 'PROFILE ROUTER GET: profile not found'));
  //     return res.json(profile);
  //   })
    .catch(next);
  return undefined;
});

export default profileRouter;
