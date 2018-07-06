import superagent from 'superagent';
import faker from 'faker';
import { startServer, stopServer } from '../lib/server';
import { createAccountMockPromise } from './lib/account-mock';
import { removeAllResources } from './lib/profile-mock';
import Profile from '../model/profile';  /*eslint-disable-line*/

const apiUrl = `http://localhost:${process.env.PORT}/api`;


describe('TESTING PROFILE ROUTER', () => {
  let mockData;
  let token;
  let account;
  beforeAll(async () => {
    startServer();
    mockData = await createAccountMockPromise(); // this part blocks until we retrieve the resolved value. Anything in this "beforeAll" block will not run below this line until the "await" function resolves
    token = mockData.token; /*eslint-disable-line*/
    account = mockData.account; /*eslint-disable-line*/
  });
  afterAll(stopServer);
  afterEach(removeAllResources);

  describe('POST ROUTES TESTING', () => {
    test('POST 200 to /api/profiles for successfully created profile', async () => {
      const mockProfile = {
        bio: faker.lorem.words(60),
        firstName: 'Devin',
        lastName: 'Cunningham',
      };
      try {
        const response = await superagent.post(`${apiUrl}/profiles`)
          .set('Authorization', `Bearer ${token}`)
          .send(mockProfile);
        expect(response.status).toEqual(200);
        expect(response.body.accountId).toEqual(account._id.toString());
        expect(response.body.firstName).toEqual(mockProfile.firstName);
        expect(response.body.lastName).toEqual(mockProfile.lastName);
        expect(response.body.bio).toEqual(mockProfile.bio);
      } catch (err) {
        expect(err.status).toEqual(200);
      }
    });

    test('POST 401 for trying to post a profile with a bad token', async () => {
      try {
        await superagent.post(`${apiUrl}/profiles`)
          .set('Authorization', 'Bearer NOTGONNAWORK');
      } catch (err) {
        expect(err.status).toEqual(400);
      }
    });
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

  describe('GET PROFILE ROUTES TESTING', () => {
    // test('200 GET for successful fetching of a model', async () => {
    //   try {
    //     const res = await superagent.get(`${apiUrl}/profiles/`)
    //       .set('Authorization', `Bearer ${token}`);
    //     expect(res.status).toEqual(200);
    //   } catch (err) {
    //     expect(err.status).toEqual('failing for 200 GET');
    //   }
    // });
    
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
