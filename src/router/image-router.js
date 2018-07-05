import multer from 'multer';
import { Router } from 'express';
import HttpErrors from 'http-errors';
import bearerAuthMiddleware from '../lib/middleware/bearer-auth-middleware';
import Image from '../model/image';
import { s3Upload, s3Remove } from '../lib/s3';
import logger from '../lib/logger';

const multerUpload = multer({ dest: `${__dirname}/../temp` });
const imageRouter = new Router();

imageRouter.post('/api/images', bearerAuthMiddleware, multerUpload.any(), (req, res, next) => {
  if (!req.account) return next(new HttpErrors(401, 'IMAGE ROUTER POST ERROR: NOT AUTHORIZED'));
  if (!req.body.title || req.files.length > 1) {
    return next(new HttpErrors(400, 'IMAGE ROUTER POST ERROR: INVALID REQ'));
  }
  const [file] = req.files;
  logger.log(logger.INFO, `IMAGE ROUTER POST: VALID FILE READY TO UPLOAD: ${JSON.stringify(file, null, 2)}`);
  const key = `${file.filename}.${file.originalname}`;
  return s3Upload(file.path, key)
    .then((url) => {
      logger.log(logger.INFO, `IMAGE ROUTER POST: RECIEVED VALID URL FROM AMAZON S3: ${url}`);
      return new Image({
        title: req.body.title,
        accountId: req.account._id,
        fileName: key,
        url,
      }).save();
    })
    .then((newImage) => {
      logger.log(logger.INFO, `IMAGE ROUTER POST: NEW IMAGE CREATED : ${JSON.stringify(newImage, null, 2)}`);
      return res.json(newImage);
    })
    .catch(next);
});

imageRouter.get('/api/images/:id?', bearerAuthMiddleware, (req, res, next) => {
  if (!req.account) return next(new HttpErrors(400, 'IMAGE ROUTER GET: INVALID REQ'));
  if (!req.params.id) return next(new HttpErrors(400, 'IMAGE ROUTER GET: NO ID PROVIDED'));

  return Image.findById(req.params.id)
    .then((image) => {
      if (!image) return next(new HttpErrors(404, 'IMAGE ROUTER GET: NO IMAGE FOUND'));
      logger.log(logger.INFO, `IMAGE ROUTER GET: SUCCESSFULLY FOUND IMAGE ${JSON.stringify(image, null, 2)}`);
      return res.json(image);
    })
    .catch(next);
});

export default imageRouter;
