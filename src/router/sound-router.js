import multer from 'multer';
import { Router } from 'express';
import HttpErrors from 'http-errors';
import bearerAuthMiddleware from '../lib/middleware/bearer-auth-middleware';
import Sound from '../model/sound';
import { s3Upload, s3Remove } from '../lib/s3';
import logger from '../lib/logger';

const multerUpload = multer({ dest: `${__dirname}/../temp` });

const soundRouter = new Router();

soundRouter.post('/api/sounds', bearerAuthMiddleware, multerUpload.any(), (request, response, next) => {
  if (!request.account) return next(new HttpErrors(401, 'SOUND ROUTER POST ERROR: not authorized'));

  if (!request.body.title || request.files.length > 1) {
    return next(new HttpErrors(400, 'SOUND ROUTER POST ERROR: invalid request'));
  }

  const [file] = request.files;

  logger.log(logger.INFO, `SOUND ROUTER POST: valid file ready to to upload: ${JSON.stringify(file, null, 2)}`);

  const key = `${file.filename}.${file.originalname}`;
  return s3Upload(file.path, key)
    .then((url) => {
      logger.log(logger.INFO, `SOUND ROUTER POST: received a valid URL from Amazon S3: ${url}`);

      return new Sound({
        title: request.body.title,
        accountId: request.account._id,
        fileName: key,
        url,
      }).save();
    })
    .then((newSound) => {
      logger.log(logger.INFO, `SOUND ROUTER POST: new sound created: ${JSON.stringify(newSound, null, 2)}`);
      return response.json(newSound);
    })
    .catch(next); 
});

soundRouter.get('/api/sounds/:id?', bearerAuthMiddleware, (request, response, next) => {
  if (!request.account) return next(new HttpErrors(401), 'SOUND ROUTER GET: invalid request');
  if (!request.params.id) return next(new HttpErrors(400, 'SOUND ROUTER GET: no id provided'));

  return Sound.findById(request.params.id)
    .then((sound) => {
      if (!sound) return next(new HttpErrors(404, 'SOUND ROUTER GET: no sound found'));
      logger.log(logger.INFO, `SOUND ROUTER GET: successfully found sound ${JSON.stringify(sound, null, 2)}`);
      return response.json(sound);
    })
    .catch(next);
});

export default soundRouter;
