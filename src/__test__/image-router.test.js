'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { pCreateImageMock, removeImagesAndAccounts } from './lib/image-mock';

const stitchJpg = `${__dirname}/asset/stitch.JPG`;  /*eslint-disable-line*/
const apiUrl = `http://localhost:${process.env.PORT}/api/images`;

describe('TESTING ROUTES AT /api/images', () => {
  let token;
  let account;  /*eslint-disable-line*/
  let image;
  beforeAll(startServer);
  afterAll(stopServer);
  beforeEach(async () => {
    try {
      const mockData = await pCreateImageMock();
      token = mockData.token; /*eslint-disable-line*/
      account = mockData.account; /*eslint-disable-line*/
      image = mockData.image; /*eslint-disable-line*/
    } catch (err) {
      return console.log(err);
    }
    return undefined;
  });
  afterEach(async () => {
    await removeImagesAndAccounts();
  });

  describe('POST ROUTES TO /api/images', () => {
    test('POST 200', async () => {
      try {
        const res = await superagent.post(apiUrl)
          .set('Authorization', `Bearer ${token}`)
          .field('title', 'dog image')
          .attach('image', 'stitchJpg');
        expect(res.status).toEqual(200);
        expect(res.body.title).toEqual('dog image');
        expect(res.body._id).toBeTruthy();
        expect(res.body.url).toBeTruthy();
        expect(res.body.url).toBeTruthy();
      } catch (err) {
        console.log(err);
        expect(err).toEqual('ERROR FROM POST 200 THIS SHOULDNT HAPPEN');
      }
      return undefined;
    });
  });

  describe('GET ROUTS TO /api/images', () => {
    test('200 GET /api/images for successful fetching of an image', async () => {
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
        expect(err).toEqual('FAILING IN GET 200 POST');
      }
    });
  });
});
