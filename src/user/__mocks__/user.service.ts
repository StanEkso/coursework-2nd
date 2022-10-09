import { userStub } from '../../../test/stubs/user.stub';

export const UserService = jest.fn().mockReturnValue({
  createUser: jest.fn().mockReturnValue(userStub()),
});
