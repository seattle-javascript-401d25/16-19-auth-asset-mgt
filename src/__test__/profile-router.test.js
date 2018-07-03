import superagent from 'superagent';
import faker from 'faker';
import { startServer, stopServer } from '../lib/server';
import { pCreateAccountMock } from './lib/account-mock';
// import { removeAllResources } from './lib/profile-mock';

const apiUrl = `http://localhost:${process.env.PORT}/api`;

describe('TESTING ROUTER PROFILE', () => {
  let mockData;
  let token;
  let account;
  beforeAll(async () => {
    startServer();
  });

  afterAll(stopServer);
  beforeEach(async () => {
    // await removeAllResources();
    try {
      mockData = await pCreateAccountMock();
      account = mockData.account; /*eslint-disable-line*/
      token = mockData.token; /*eslint-disable-line*/
    } catch (err) {
      return console.log(err);
    }
    return undefined;
  });

  describe('POST PROFILE ROUTES TESTING', () => {
    test('POST 200 to /api/profiles for successful profile creation', async () => {
      const mockProfile = {
        bio: faker.lorem.words(40),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      };
      try {
        const res = await superagent.post(`${apiUrl}/profiles`)
          .set('Authorization', `Bearer ${token}`)
          .send(mockProfile);
        expect(res.status).toEqual(200);
        expect(res.body.accountId).toEqual(account._id.toString());
        expect(res.body.firstName).toEqual(mockProfile.firstName);
        expect(res.body.lastName).toEqual(mockProfile.lastName);
        expect(res.body.bio).toEqual(mockProfile.bio);
      } catch (err) {
        expect(err).toEqual('DEVIN');
      }
    });

    test('POST 400 for trying to POST a profile with a bad TOKEN', async () => {
      try {
        const res = await superagent.post(`${apiUrl}/profiles`)
          .set('Authorization', 'Bearer BADTOKEN');
        expect(res).toEqual('DEVIN');
      } catch (err) {
        expect(err.status).toEqual(400);
      }
    });

    test('POST 404 for trying to POST a profile with a bad PATH', async () => {
      try {
        const res = await superagent.post(`${apiUrl}/BADPATH`)
          .set('Authorization', `Bearer ${token}`);
        expect(res).toEqual('DEVIN');
      } catch (err) {
        expect(err.status).toEqual(404);
      }
    });
  });

  describe('GET PROFILE ROUTES TESTING', () => {
    test('GET 404 to /api/profiles/?id= for a BAD profile PATH', async () => {
      try {
        const res = await superagent.get(`${apiUrl}/notGonnaWork`);
        expect(res).toEqual('DEVIN');
      } catch (err) {
        expect(err.status).toEqual(404);
      }
    });
  });
});
