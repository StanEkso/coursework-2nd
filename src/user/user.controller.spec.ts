import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

jest.mock('./user.service');

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Should create user', async () => {
    const user = await controller.createUser({
      username: 'testusername',
      email: 'testemail',
      password: 'testpassword',
    });
    expect(user).toStrictEqual({
      id: 'user-id',
      username: 'testusername',
      email: 'testemail',
      password: 'testpassword',
    });
  });
});
