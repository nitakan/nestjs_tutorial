import { Body, Controller, Get, Post, UseInterceptors } from '@nestjs/common';
import { ReqCtx } from 'src/decorator/request.decorator';
import { LoggingInterceptor } from 'src/interceptor/logging.intercepter';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';

@Controller({path: 'coffees'})
@UseInterceptors(LoggingInterceptor)
export class CoffeesController {

    constructor(private readonly coffeesService: CoffeesService ) {}

    @Get()
    findAll(@ReqCtx() context) {
        return this.coffeesService.getAllCoffees(context);
    }

    @Post()
    create(@Body() body: CreateCoffeeDto, @ReqCtx() context) {
        this.coffeesService.createCoffee(
            context, 
            body,
        );
    }
}

