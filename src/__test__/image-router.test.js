'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { createImageMockPromise, removeImagesAndAccounts } from './lib/image-mock';

const stitchJpg = `${__dirname}/asset/stitch.jpg`;
const apiUrl = `http://localhost:${process.env.PORT}/api/images`;

describe('TESTING ROUTES AT /api/images', () => {
  
})