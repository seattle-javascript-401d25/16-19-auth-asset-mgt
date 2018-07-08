import 'babel-polyfill';
import faker from 'faker';
import { createAccountMockPromise, removeAccountMockPromise } from './account-mock'; /*eslint-disable-line*/
import Sound from '../../model/sound';
import Account from '../../model/account';

const createSoundMockPromise = async () => {
  const mockData = {};
  
  const mockAcctResponse = await createAccountMockPromise();
 
  mockData.account = mockAcctResponse.account;
  mockData.token = mockAcctResponse.token;
  const sound = await new Sound({
    title: faker.lorem.words(2),
    url: faker.random.image(),
    fileName: faker.system.fileName(),
    accountId: mockData.account._id,
  }).save();
  
  mockData.sound = sound;
  return mockData;
};

const removeSoundsAndAccounts = () => {
  return Promise.all([
    Sound.remove({}),
    Account.remove({}),
  ]);
};


export { createSoundMockPromise, removeSoundsAndAccounts };
