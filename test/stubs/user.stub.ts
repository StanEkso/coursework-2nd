import { Users } from 'src/user/user.entity';

export const userStub = (): Users => {
  return {
    id: 'user-id',
    username: 'testusername',
    email: 'testemail',
    password: 'testpassword',
  };
};
