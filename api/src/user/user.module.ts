import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { RepositoryModule } from 'src/repository/repository.module';

@Module({
  imports: [RepositoryModule],
  providers: [
    UserService,
  ],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
