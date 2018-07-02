'use strict';

import faker from 'faker';
import Account from '../../model/account';
import { access } from 'fs';

const pCreateAccountMock = () => {
  const mockData = {};
  const originalReq = {
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.lorem.word(8),
  };

  return Account.create(originalReq.username, originalReq.email, originalReq.password)
    .then((account) => {
      mockData.originalReq = originalReq;
      mockData.account = account;
      return account.pCreateToken();
    })
    .then((token) => {
      mockData.token = token;
      return Account.findById(mockData.account._id);
    })
    .then((account) => {
      mockData.account = account;
      return mockData;
    });
};

const pRemoveAccountMock = () => Account.remove({});
