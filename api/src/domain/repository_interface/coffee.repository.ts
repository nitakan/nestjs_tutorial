import { Coffee, CoffeeStocks, CreateCoffee, Stock } from "src/domain/entity/coffee.model";
import { Paginated, PaginationContext } from "../entity/request.entity";

export abstract class CoffeeRepository {
    abstract all(userId: string, pagination: PaginationContext): Promise<Paginated<CoffeeStocks[]>>;
    abstract findBy(id: string): Promise<CoffeeStocks | null>;
    abstract create(userId: string, coffee: CreateCoffee): Promise<CoffeeStocks | null>;
}

export abstract class StockRepository {
    abstract all(userId: string, pagination: PaginationContext): Promise<CoffeeStocks[]>;
    abstract add(userId: string, coffeeId: string, stock: Stock): Promise<Stock>;
}
