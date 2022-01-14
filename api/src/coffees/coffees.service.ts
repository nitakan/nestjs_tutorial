import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { Coffee } from './model/coffee.model';

@Injectable({ scope: Scope.DEFAULT })
export class CoffeeRepository {
    coffees: Array<Coffee>;
    constructor() {
        const range = (from: number, to: number): Array<number> => {
            const array = new Array();
            for (var i = from; i <= to; i++) {
                array.push(i);
            }
            return array;
        };

        this.coffees = range(0, 1).map(i => new Coffee(i, `coffee:${i}`, `brand`, 0));
    }
    
    private async getIndex(id: number): Promise<number> {
        const index = this.coffees.findIndex((item) => item.id == id);
        if (index < 0) {
            throw new NotFoundException();
        }
        return index;
    }

    async find(id: number): Promise<Coffee> {
        return this.coffees[id] || null;
    }

    async findAll(page: number, limit: number): Promise<Array<Coffee>> {
        return this.coffees.slice((page - 1) * limit, page * limit);
    }

    async create(item: Coffee): Promise<number> {
        item.id = this.coffees.length;
        this.coffees.push(item);
        return item.id;
    }

    async delete(id: number): Promise<Coffee> {
        const targetIndex = await this.getIndex(id);
        const deleted = this.coffees.splice(targetIndex, 1);
        return deleted[0];
    }

    async update(item: Coffee): Promise<Coffee> {
        const targetIndex = await this.getIndex(item.id);
        this.coffees[targetIndex].name = item.name;
        this.coffees[targetIndex].brand = item.brand;
        return this.coffees[targetIndex];
    }

}


@Injectable()
export class CoffeesService {
    
    constructor(private readonly repo: CoffeeRepository){}

    async getCoffees(page: number = 1, limit: number = 20): Promise<Array<Coffee>> {
        return await this.repo.findAll(page, limit);
    }

    async add(item: CreateCoffeeDto): Promise<any> {
        await this.repo.create(new Coffee(null, item.name, item.brand, item.count || 0));
    }

    async remove(id: number): Promise<Coffee> {
        return await this.repo.delete(id);
    }

    async get(id: number): Promise<Coffee> {
        const item = await this.repo.find(id);
        if (!item) {
            throw new NotFoundException();
        }
        return item;
    }

    async create(item: Coffee): Promise<number> {
        return await this.repo.create(item);
    }

    async update(item: Coffee): Promise<Coffee> {
        return await this.repo.update(item);
    }

}



