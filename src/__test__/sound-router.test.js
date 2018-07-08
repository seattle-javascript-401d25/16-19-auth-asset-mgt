'use strict';

import superagent from 'superagent';
import { startServer, stopServer } from '../lib/server';
import { createSoundMockPromise, removeSoundsAndAccounts } from './lib/sound-mock';

const dogMp3 = `${__dirname}/asset/emuexport.jpg`;
const apiUrl = `http://localhost:${process.env.PORT}/api/sounds`;

describe('TESTING ROUTES AT /api/sounds', () => {
  let token;
  let account; /*eslint-disable-line*/
  let sound;
  beforeAll(startServer);
  afterAll(stopServer);
  beforeEach(async () => {
    try {
      const mockData = await createSoundMockPromise();
      token = mockData.token; /*eslint-disable-line*/
      account = mockData.account; /*eslint-disable-line*/
      sound = mockData.sound; /*eslint-disable-line*/
    } catch (err) {
      return console.log(err);
    }
    return undefined;
  });
  afterEach(async () => {
    await removeSoundsAndAccounts();
  });

  describe('POST ROUTES TO /api/sounds', () => {
    test('POST 200', async () => {
      try {
        const response = await superagent.post(apiUrl)
          .set('Authorization', `Bearer ${token}`)
          .field('title', 'dog barks')
          .attach('sound', dogMp3);
        expect(response.status).toEqual(200);
        expect(response.body.title).toEqual('dog barks');
        expect(response.body._id).toBeTruthy();
        expect(response.body.url).toBeTruthy();
        expect(response.body.url).toBeTruthy();
      } catch (err) {
        console.log(err);
        expect(err).toEqual('foo');
      }
      return undefined;
    });


    test('POST 400 on bad request', async () => {
      try {
        const response = await superagent.post(apiUrl)
          .set('Authorization', `Bearer ${token}`)
          .field('BADFIELDNAME', 'BADFIELD')
          .attach('sound', dogMp3);

        expect(response).toBe('foo');
      } catch (err) {
        expect(err.status).toBe(400);
      }
    });

    test('POST 401 on bad token', async () => {
      try {
        const badToken = 'BADTOKEN';
        const response = await superagent.post(apiUrl)
          .set('Authorization', `Bearer ${badToken}`)
          .field('BADFIELDNAME', 'BADFIELD')
          .attach('sound', dogMp3);

        expect(response).toBe('foo');
      } catch (err) {
        expect(err.status).toBe(401);
      }
    });
  });

  describe('GET ROUTES to /api/sounds', () => {
    test('200 GET /api/sounds for succesful fetching of a sound', async () => {
      try {
        const response = await superagent.get(`${apiUrl}/${sound._id}`)
          .set('Authorization', `Bearer ${token}`);
        expect(response.status).toEqual(200);
        expect(response.body.title).toEqual(sound.title);
        expect(response.body.accountId).toEqual(sound.accountId.toString());
        expect(response.body.url).toEqual(sound.url);
        expect(response.body.fileName).toEqual(sound.fileName);
      } catch (err) {
      console.log(err, 'ERROR FROM sound-ROUTER-TEST: get 200 test'); /*eslint-disable-line*/
        expect(err).toEqual('FAILING IN GET 200 POST');
      }
    });

    test('404 GET due to bad id', async () => {
      try {
        const response = await superagent.get(`${apiUrl}/${'BADID'}`)
          .set('Authorization', `Bearer ${token}`);

        expect(response).toBe('foo');
      } catch (err) {
        expect(err.status).toBe(404);
      }
    });

    test('401 GET due to bad token', async () => {
      try {
        const response = await superagent.get(`${apiUrl}/${sound._id}`)
          .set('Authorization', `Bearer ${'BADTOKEN'}`);
        expect(response).toEqual('foo');
      } catch (err) {
        expect(err.status).toBe(401);
      }
    });
  });
});
