import { Router } from 'express';
import HttpErrors from 'http-errors';
import Profile from '../model/profile';
import bearerAuthMiddleware from '../lib/middleware/bearer-auth-middleware';
import logger from '../lib/logger';

const profileRouter = new Router();

profileRouter.post('/api/profiles', bearerAuthMiddleware, (request, response, next) => {
  if (!request.account) return next(new HttpErrors(400, 'POST PROFILE ROUTER-AUTH: invalid request'));

  Profile.init()
    .then(() => {
      return new Profile({
        ...request.body,
        accountId: request.account._id,
      })
        .save()
        .then((profile) => {
          logger.log(logger.INFO, `POST PROFILE ROUTER: new profile created with 200 code, ${JSON.stringify(profile, null, 2)}`);
          return response.json(profile);
        })
        .catch(next);
    })
    .catch(next);
  return undefined;
});

profileRouter.get('/api/profiles/:id?', bearerAuthMiddleware, (request, response, next) => {
  if (!request.account) return next(new HttpErrors(400, 'GET PROFILE ROUTER-AUTH: INVALID REQ'));
  
  if (!request.params.id) {
    Profile.find({})
      .then((profiles) => {
        return response.json(profiles);
      })
      .catch(next);
    return undefined;
  }

  Profile.findOne({ _id: request.params.id })
    .then((profile) => {
      if (!profile) return next(new HttpErrors(400, 'profile not found'));
      logger.log(logger.INFO, `PROFILE ROUTER GET: found profile: ${JSON.stringify(profile, null, 2)}`);
      return response.json(profile);
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
