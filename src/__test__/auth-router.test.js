'use strict';

import superagent from 'superagent';
import faker from 'faker';

import { startServer, stopServer } from '../lib/server';
import { pCreateAccountMock, pRemoveAccountMock } from './lib/account-mock';


const apiUrl = `http://localhost:${process.env.PORT}/api`;

describe('AUTH Router', () => {
  beforeAll(startServer);
  afterAll(stopServer);
  afterEach(pRemoveAccountMock);

  test('POST 200 to /api/signup for successful account creation and receipt of a TOKEN', () => {
    const mockAccount = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: '1234',
    };
    return superagent.post(`${apiUrl}/signup`)
      .send(mockAccount)
      .then((res) => {
        expect(res.status).toEqual(200);
        expect(res.body.token).toBeTruthy();
      })
      .catch((err) => {
        throw err;
      });
  });

  test('POST 400 to /api/signup with no UN or PW', async () => {
    const mockAccount = {
      // username: faker.internet.userName(),
      email: faker.internet.email(),
      // password: '1234',
    };
    try {
      const res = await superagent.post(`${apiUrl}/profiles`)
        .send(mockAccount);
      expect(res).toEqual('DEVIN');
    } catch (err) {
      expect(err.status).toEqual(400);
    }
  });

  test('POST 404 to /api/signup with bad path', async () => {
    const mockAccount = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: '1234',
    };
    try {
      const res = await superagent.post(`${apiUrl}/profile`)
        .send(mockAccount);
      expect(res).toEqual('DEVIN');
    } catch (err) {
      expect(err.status).toEqual(404);
    }
  });

  test('GET 200 to api/login for successful login and receipt of a TOKEN', () => {
    return pCreateAccountMock()
      .then((mockData) => {
        return superagent.get(`${apiUrl}/login`)
          .auth(mockData.account.username, mockData.originalReq.password);
      })
      .then((res) => {
        expect(res.status).toEqual(200);
        expect(res.body.token).toBeTruthy();
      })
      .catch((err) => {
        throw err;
      });
  });

  test('GET 401 to api/login for unsuccessful login with bad UN and PW', () => {
    return superagent.get(`${apiUrl}/login`)
      .auth('notgonna', 'work')
      .then((res) => {
        throw res;
      })
      .catch((err) => {
        expect(err.status).toEqual(401);
      });
  });


  test('GET 404 for trying to GET /api/login with a bad PATH', async () => {
    try {
      const res = await superagent.get(`${apiUrl}/logi`)
        .set('Authorization', 'Bearer token as well');
      expect(res).toEqual('DEVIN');
    } catch (err) {
      expect(err.status).toEqual(404);
    }
  });
});
