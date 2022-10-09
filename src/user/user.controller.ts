import { Body, Controller, Post } from '@nestjs/common';
import { UserCreationDto } from './dto/userCreation.dto';
import { Users } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async createUser(@Body() userCreationDto: UserCreationDto): Promise<Users> {
    return await this.userService.createUser(userCreationDto);
  }
}
