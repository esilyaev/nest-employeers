import { Injectable } from '@nestjs/common';
import { JwtPayload } from 'src/auth/jwt.strategy';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
  ) {}

  async create({ name }: CreateCompanyDto, userPayload: JwtPayload) {
    const user = await this.userService.findOne(userPayload.email);
    const company = await this.prisma.company.create({
      data: {
        name,
        user: { connect: { id: user.id } },
      },
    });
    return company;
  }

  async findAll() {
    return await this.prisma.company.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
