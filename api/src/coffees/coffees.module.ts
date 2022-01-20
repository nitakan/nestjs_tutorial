import { Global, Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository/repository.module';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';

@Global()
@Module({
  imports: [RepositoryModule],
  controllers: [CoffeesController],
  providers: [CoffeesService],
  exports: [CoffeesService],
})
export class CoffeesModule {}
