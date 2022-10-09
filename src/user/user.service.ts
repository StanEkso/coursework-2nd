import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserCreationDto } from './dto/userCreation.dto';
import { Users } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
  ) {}
  async createUser(userCreationDto: UserCreationDto): Promise<Users> {
    try {
      const user = this.userRepository.create(userCreationDto);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException('Not unique email or username!');
    }
  }

  async getUserById(id: string): Promise<Users> {
    const user = await this.userRepository.findOneBy({ id });
    return user;
  }

  async getAll() {
    return await this.userRepository.find({ take: 10 });
  }
}
