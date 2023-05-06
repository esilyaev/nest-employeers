import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UserService) {}

  async signIn(loginUserDto: LoginUserDto) {
    return await this.usersService.validate(loginUserDto);
  }

  async signUp(createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }
}
