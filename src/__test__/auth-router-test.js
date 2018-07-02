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
      password: 'a#$%SFbf9fxnkjS#@45',
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

  test('GET 400 to api/login for unsuccessful login with bad un and pw', () => {
    return superagent.get(`${apiUrl}/login`)
      .auth('notgonna', 'work')
      .then((res) => {
        throw res;
      })
      .catch((err) => {
        expect(err.status).toEqual(400);
      });
  });
});
