import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  getRepositoryToken,
  TypeOrmModule,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { UserService } from './user.service';

const options: TypeOrmModuleOptions = {
  host: process.env.POSTGRES_HOST || 'localhost',
  port: +process.env.POSTGRES_PORT || 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'postgres',
  type: 'postgres',
  entities: [Users],
  synchronize: true,
};

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<Users>;
  let userId: string;
  console.log(process.env.DATABASE_URL);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(options),
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
    it('Get existing user by ID', async () => {
      const user = await service.getUserById(userId);
      expect(user).not.toBeNull();
    });
    it('Get not existing user by ID', async () => {
      const user = await service.getUserById('fc' + userId.slice(2));
      expect(user).toBeFalsy();
    });
  });

  describe('Get by name', () => {
    it('Get existing user by Name', async () => {
      const user = await service.getByName('testusername');
      expect(user).not.toBeNull();
    });
    it('Get not existing user by Name', async () => {
      const user = await service.getByName('nonexistingname');
      expect(user).toBeFalsy();
    });
  });

  afterAll(() => {
    userRepository.clear();
  });
});
