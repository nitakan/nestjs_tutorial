import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Req, UseInterceptors } from '@nestjs/common';
import { Request } from 'express';
import { LoggingInterceptor } from 'src/interceptor/logging.intercepter';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { Coffee } from './model/coffee.model';

@Controller({path: 'coffees'})
@UseInterceptors(LoggingInterceptor)
export class CoffeesController {

    constructor(private readonly coffeesService: CoffeesService ) {}

    @Get()
    findAll(@Query() paginationQuery) {
        const { limit, page } = paginationQuery;
        return this.coffeesService.getCoffees(page, limit);
    }

    @Get(':id')
    find(@Param('id') id: string, @Req() req: Request) {
        if (!id.match(/[0-9]+/)) {
            throw new BadRequestException();
        }
        const item = this.coffeesService.get(Number.parseInt(id));
        if (!item) {
            throw new NotFoundException();
        }
        return item;
    }

    @Post()
    create(@Body() body: CreateCoffeeDto) {
        return this.coffeesService.create(new Coffee(null, body.name, body.brand, body.count));
    }

    @Patch(':id')
    update(@Param('id') idStr: string, @Body() body: CreateCoffeeDto) {
        const id = Number.parseInt(idStr);
        if (!id) {
            throw new BadRequestException();
        }
        return this.coffeesService.update(new Coffee(id, body.name, body.brand, body.count));
    }

    @Delete(':id')
    delete(@Param('id') idStr: string) {
        const id = Number.parseInt(idStr);
        if (!id) {
            throw new BadRequestException();
        }
        return this.coffeesService.remove(id);
    }
}

