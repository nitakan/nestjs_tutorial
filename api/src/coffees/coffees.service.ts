import { Injectable } from '@nestjs/common';
import { CoffeeStocks, CreateCoffee, CreateStock } from '../domain/entity/coffee.model';
import { CoffeeRepository, StockRepository } from 'src/domain/repository_interface/coffee.repository';
import { Paginated, RequestContext } from 'src/domain/entity/request.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { ProcessEnvOptions } from 'child_process';


@Injectable()
export class CoffeesService {
    
    constructor(private readonly repo: CoffeeRepository, private readonly stockRepositoy: StockRepository){}

    async getAllCoffees(request: RequestContext): Promise<Paginated<CoffeeStocks[]>> {
        const result = await this.repo.all(request.user.id, request.pagination);
        return result;
    }

    async getStocks(request: RequestContext): Promise<CoffeeStocks[]> {
        const result = await this.stockRepositoy.all(request.user.id, request.pagination);
        return result;
    }

    async createCoffee(request: RequestContext, coffee: CreateCoffeeDto): Promise<CoffeeStocks> {
        const create = new CreateCoffee(
            coffee.name,
            coffee.memo,
            coffee.stocks.map(s => new CreateStock(s.count, s.name, s.memo)));
    
        const result = await this.repo.create(request.user.id, create);
        return result;
    }

}



