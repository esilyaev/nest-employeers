import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import {
  USER_BAD_CREDENTIALS_ERROR,
  USER_EMAIL_ALREADY_USED_ERROR,
  USER_EMAIL_NOT_FOUND_ERROR,
} from './consts/errors';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({ email, name, password }: CreateUserDto) {
    const emailAlreadyUsed = await this.prismaService.user.findFirst({
      where: { email },
    });

    if (emailAlreadyUsed) {
      throw new BadRequestException(USER_EMAIL_ALREADY_USED_ERROR);
    }

    const hashedPassword = bcrypt.hashSync(password, 5);
    const newUser = await this.prismaService.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const { password: _, ...userData } = newUser;
    return userData;
  }

  async validate({ email, password }: LoginUserDto) {
    const user = await this.findOne(email);

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new BadRequestException(USER_BAD_CREDENTIALS_ERROR);
    }

    const { password: _, ...userData } = user;
    return userData;
  }

  async findOne(email: string) {
    const user = await this.prismaService.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw new BadRequestException(USER_EMAIL_NOT_FOUND_ERROR);
    }

    return user;
  }
}
