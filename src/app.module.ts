import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [UserModule, AuthModule, CompanyModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
