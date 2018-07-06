import 'babel-polyfill';
import faker from 'faker';
import { createAccountMockPromise, removeAccountMockPromise } from './account-mock'; /*eslint-disable-line*/
import Image from '../../model/image';
import Account from '../../model/account';

const createImageMockPromise = async () => {
  const mockData = {};
  const mockAcctResponse = await createAccountMockPromise();
  mockData.account = mockAcctResponse.account;
  mockData.token = mockAcctResponse.token;
  const image = await new Image({
    title: faker.lorem.words(3),
    url: faker.random.image(),
    fileName: faker.system.fileName(),
    accountId: mockData.account._id,
  }).save();
  mockData.image = image;
  return mockData;
};

const removeImagesAndAccounts = () => {
  return Promise.all([
    Image.remove({}),
    Account.remove({}),
  ]);
};

export { createImageMockPromise, removeImagesAndAccounts };
