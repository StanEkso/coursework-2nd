import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<Users>;
  let userId: string;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: 'root',
          database: 'testingdb',
          entities: [Users],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Users]),
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<Users>>(getRepositoryToken(Users));
    jest.spyOn(userRepository, 'create');
    jest.spyOn(userRepository, 'find');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('userRepository should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('createUser', () => {
    it('Creates new user', async () => {
      const object = {
        username: 'testusername',
        password: 'testpassword',
        email: 'email@example.com',
      };
      const result = await service.createUser(object);
      userId = result.id;
      expect(userRepository.create).toBeCalledWith(object);
    });

    it('Creates user with same data', async () => {
      const object = {
        username: 'testusername',
        password: 'testpassword',
        email: 'email@example.com',
      };
      try {
        await service.createUser(object);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('getAll', () => {
    it('Get all users', async () => {
      const users = await service.getAll();
      expect(userRepository.find).toBeCalled();
      expect(users.length).toBe(1);
    });
  });

  describe('getById', () => {
    it('Get user by ID', async () => {
      const user = await service.getUserById(userId);
      expect(user).not.toBeNull();
    });
  });

  afterAll(() => {
    userRepository.clear();
  });
});
