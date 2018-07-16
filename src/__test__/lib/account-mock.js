import faker from 'faker';
import HttpError from 'http-errors';
import Account from '../../model/account';

const createAccountMockPromise = () => {
  const mockData = {};
  const originalRequest = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.lorem.words(5),
  };

  return Account.create(originalRequest.username, originalRequest.email, originalRequest.password)
    .then((account) => {
      mockData.originalRequest = originalRequest;
      mockData.account = account;
      return account.createTokenPromise();
    })
    .then((token) => {
      mockData.token = token;
      return Account.findById(mockData.account._id);
    })
    .then((account) => {
      mockData.account = account;
      return mockData;
    })
    .catch((err) => {
      throw new HttpError(500, `ACCOUNT MOCK: Error creating mock account. ${JSON.stringify(err)}`);
    });
};

const removeAccountMockPromise = () => Account.remove({});

export { createAccountMockPromise, removeAccountMockPromise };
