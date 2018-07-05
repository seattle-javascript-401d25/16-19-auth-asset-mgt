import 'babel-polyfill';
import faker from 'faker';
import { pCreateAccountMock, pRemoveAccountMock } from './account-mock'; /*eslint-disable-line*/
import Image from '../../model/image';
import Account from '../../model/account';

const pCreateImageMock = async () => {
  const mockData = {};
  const mockAcctRes = await pCreateAccountMock();
  mockData.account = mockAcctRes.account;
  mockData.token = mockAcctRes.token;
  const image = await new Image({
    title: faker.lorem.words(2),
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

export { pCreateImageMock, removeImagesAndAccounts };
