import { IsEmail, IsString, Length } from 'class-validator';

export class UserCreationDto {
  @IsEmail({}, { message: 'Field email must be email!' })
  email: string;

  @IsString({ message: 'Password should be a string' })
  @Length(4, 14, {
    message: "Password length shouldn't be less than 4 and greater than 14",
  })
  password: string;

  @IsString({ message: 'Username is a string field' })
  username: string;
}
