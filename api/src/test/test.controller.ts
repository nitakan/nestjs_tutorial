import { Controller, Get } from '@nestjs/common';
import { CoffeesService } from 'src/coffees/coffees.service';

@Controller('test2')
export class TestController {

    constructor(private readonly service: CoffeesService) {}

    @Get()
    getCoffees() {
        return this.service.getCoffees();
    }
}
