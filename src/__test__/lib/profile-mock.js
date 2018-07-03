import faker from 'faker';
import Profile from '../../model/profile';
import { pCreateAccountMock, pRemoveAccountMock } from './account-mock';

const pCreateProfileMock = () => {
  const mockData = {};
  return pCreateAccountMock()
    .then((mockAccountData) => {
      mockData.account = mockAccountData.account;
      mockData.token = mockAccountData.token;

      const mockProfile = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        profileImageUrl: faker.random.image(),
        accountId: mockAccountData.account._id,
      };
      return new Profile(mockProfile).save();
    })
    .then((profile) => {
      mockData.profile = profile;
      return mockData;
    })
    .catch((err) => {
      throw err;
    });
};

const removeAllResources = () => {
  return Promise.all([
    Profile.remove({}),
    pRemoveAccountMock(),
  ]);
};

export { pCreateProfileMock, removeAllResources };
