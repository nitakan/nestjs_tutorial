import { Global, Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeeRepository, CoffeesService } from './coffees.service';

@Global()
@Module({
  controllers: [CoffeesController],
  providers: [CoffeesService, CoffeeRepository],
  exports: [CoffeesService],
})
export class CoffeesModule {}
