'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { createImageMockPromise } from './lib/image-mock';

const dogMp3 = `${__dirname}/asset/stitch.JPG`;
const apiUrl = `http://localhost:${process.env.PORT}/api/images`;

describe('TESTING ROUTES AT /api/images', () => {
  let token;
  let account; /*eslint-disable-line*/
  let image;
  beforeAll(startServer);
  afterAll(stopServer);
  beforeEach(async () => {
    try {
      const mockData = await createImageMockPromise();
      token = mockData.token; /*eslint-disable-line*/
      account = mockData.account; /*eslint-disable-line*/
      image = mockData.image; /*eslint-disable-line*/
    } catch (err) {
      return console.log(err);
    }
    return undefined;
  });
  // afterEach(async () => {
  //   await removeImagesAndAccounts();
  // });

  describe('POST ROUTES TO /api/images', () => {
    test('POST 200', async () => {
      try {
        const response = await superagent.post(apiUrl)
          .set('Authorization', `Bearer ${token}`)
          .field('title', 'dog image')
          .attach('image', dogMp3);
        expect(response.status).toEqual(200);
        expect(response.body.title).toEqual('dog image');
        expect(response.body._id).toBeTruthy();
        expect(response.body.url).toBeTruthy();
        expect(response.body.url).toBeTruthy();
      } catch (err) {
        console.log(err);
        expect(err).toEqual('SHOULDNT BE HERE FOR A POST 200!!!!');
      }
      return undefined;
    });
  });

  describe('GET ROUTES to /api/images', () => {
    test('200 GET /api/images for successful fetching of a image', async () => {
      try {
        const response = await superagent.get(`${apiUrl}/${image._id}`)
          .set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(200);
        expect(response.body.title).toEqual(image.title);
        expect(response.body.accountId).toEqual(image.accountId.toString());
        expect(response.body.url).toEqual(image.url);
        expect(response.body.fileName).toEqual(image.fileName);
      } catch (err) {
        console.log(err);
        expect(err).toEqual('SHOULDNT BE HERE FOR A GET 200!!!');
      }
    });
  });

  describe('DELETE ROUTES to /api/images', () => {
    test('202 GET /api/images for successful DELETE of a image', async () => {
      try {
        const response = await superagent.delete(`${apiUrl}/${image._id}`)
          .set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(200);
        // expect(response.body.title).toEqual(null);
        // expect(response.body.accountId).toEqual(null);
        // expect(response.body.url).toEqual(null);
        // expect(response.body.fileName).toEqual(null);
      } catch (err) {
        console.log(err);
        expect(err).toEqual('SHOULDNT BE HERE FOR A DELETE 202!!!');
      }
    });
  });
});
