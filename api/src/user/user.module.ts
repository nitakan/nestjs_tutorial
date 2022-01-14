import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/model/jwt/jwt-auth.guard';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  providers: [
    UserService,
  ],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
