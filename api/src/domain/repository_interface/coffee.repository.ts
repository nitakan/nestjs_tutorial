import { Coffee, CoffeeStocks, CreateCoffee, Stock } from "src/domain/entity/coffee.model";
import { Pagination, PaginationContext } from "../entity/request.entity";

export abstract class CoffeeRepository {
    abstract all(userId: string, pagination: PaginationContext): Promise<Pagination<CoffeeStocks[]>>;
    abstract findBy(id: string): Promise<Coffee | null>;
    abstract create(userId: string, coffee: CreateCoffee): Promise<Coffee | null>;
}

export abstract class StockRepository {
    abstract all(userId: string, pagination: PaginationContext): Promise<CoffeeStocks[]>;
    abstract add(userId: string, coffeeId: string, stock: Stock): Promise<Stock>;
}
