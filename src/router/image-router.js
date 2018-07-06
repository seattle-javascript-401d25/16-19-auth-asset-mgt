import multer from 'multer';
import { Router } from 'express';
import HttpErrors from 'http-errors';
import bearerAuthMiddleware from '../lib/middleware/bearer-auth-middleware';
import Image from '../model/image';
import { s3Upload, s3Remove } from '../lib/s3'; /*eslint-disable-line*/
import logger from '../lib/logger';

const multerUpload = multer({ dest: `${__dirname}/../temp` });

const imageRouter = new Router();

imageRouter.post('/api/images', bearerAuthMiddleware, multerUpload.any(), (request, response, next) => {
  if (!request.account) return next(new HttpErrors(401, 'IMAGE ROUTER POST ERROR: not authorized'));
  if (!request.body.title || request.files.length > 1) {
    return next(new HttpErrors(400, 'IMAGE ROUTER POST ERROR: invalid request'));
  }

  const [file] = request.files;
  logger.log(logger.INFO, `IMAGE ROUTER POST: valid file ready to to upload: ${JSON.stringify(file, null, 2)}`);
  const key = `${file.filename}.${file.originalname}`;
  return s3Upload(file.path, key)
    .then((url) => {
      logger.log(logger.INFO, `IMAGE ROUTER POST: received a valid URL from Amazon S3: ${url}`);
      return new Image({
        title: request.body.title,
        accountId: request.account._id,
        fileName: key,
        url,
      }).save();
    })
    .then((newImage) => {
      logger.log(logger.INFO, `IMAGE ROUTER POST: new image created: ${JSON.stringify(newImage, null, 2)}`);
      return response.json(newImage);
    })
    .catch(next); 
});

imageRouter.get('/api/images/:id?', bearerAuthMiddleware, (request, response, next) => {
  if (!request.account) return next(new HttpErrors(401, 'IMAGE ROUTER GET: invalid request'));
  if (!request.params.id) return next(new HttpErrors(400, 'IMAGE ROUTER GET: no id provided'));

  return Image.findById(request.params.id)
    .then((image) => {
      if (!image) return next(new HttpErrors(404, 'IMAGE ROUTER GET: no image found'));
      logger.log(logger.INFO, `IMAGE ROUTER GET: successfully found image ${JSON.stringify(image, null, 2)}`);
      console.log(image._id, 'IMAGE ID!!!!!!!!!!!!!!!!!!!!!!');
      return response.json(image);
    })
    .catch(next);
});

// TODO: write a imageRouter.delete here
imageRouter.delete('/api/images/:id?', bearerAuthMiddleware, (request, response, next) => {
  if (!request.account) return next(new HttpErrors(401), 'IMAGE ROUTER DELETE: invalid request');
  if (!request.params.id) return next(new HttpErrors(400, 'IMAGE ROUTER DELETE: no id provided'));
  return Image.findById(request.params.id)
    .then((image) => {
      if (!image) return next(new HttpErrors(404, 'IMAGE ROUTER DELETE: IMAGE image not found in database'));
      const key = image.fileName;
      return s3Remove(key);
    })
    .then((result) => {
      return response.json(result);
    })    
    .catch(next);
});

export default imageRouter;
