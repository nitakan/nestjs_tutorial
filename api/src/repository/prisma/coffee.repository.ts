import { Injectable } from "@nestjs/common";
import { Coffee, CoffeeStocks, CreateCoffee, Stock } from "src/domain/entity/coffee.model";
import { Pagination, PaginationContext, PaginationMetaData } from "src/domain/entity/request.entity";
import { CoffeeRepository, StockRepository } from "src/domain/repository_interface/coffee.repository";
import { BasePrismaRepository } from "./base.repository";

@Injectable()
export class CoffeeRepositoryPrismaImpl extends BasePrismaRepository implements CoffeeRepository {
    async all(userId: string, pagination: PaginationContext): Promise<Pagination<CoffeeStocks[]>> {
        const [count, result] = await this.$transaction([
            this.coffees.count({
                where: {
                    user_id: userId,
                },
            }),
            this.coffees.findMany({
                include: {
                    coffee_stocks: true,
                },
                where: {
                    user_id: userId,
                },
                orderBy: {
                    create_at: 'desc',
                },
                ...this.$(pagination),
            },
            )]);
        const coffees = result
            .map(c => new CoffeeStocks(new Coffee(c.id, c.name, '', c.create_at), c.coffee_stocks.map(s => new Stock(s.id, s.amount, s.memo))));
        const r = new Pagination(
            coffees,
            PaginationMetaData.from(pagination, count),
        );
        return r;
    }
    async findBy(id: string): Promise<Coffee> {
        const c = await this.coffees.findFirst({
            where: {
                id: id,
            },
        });
        return new Coffee(c.id, c.name, '', c.create_at);
    }
    async create(userId: string, coffee: CreateCoffee): Promise<Coffee> {
        const c = await this.coffees.create({
            data: {
                user_id: userId,
                name: coffee.name,
                coffee_stocks: {
                    create: coffee.stocks.map(s => {
                        return {
                            amount: s.count,
                            memo: s.memo,
                            place: s.place,
                            user_id: userId,
                        };
                    }),

                }
            }
        });
        return new Coffee(c.id, c.name, '', c.create_at);
    }

}

@Injectable()
export class StockRepositoryImpl extends BasePrismaRepository implements StockRepository {
    async all(userId: string): Promise<CoffeeStocks[]> {
        const result = await this.coffees.findMany({
            where: {
                user_id: userId,
            },
            include: {
                coffee_stocks: true,
            }
        });
        return result
            .map(c => new CoffeeStocks(new Coffee(c.id, c.name, '', c.create_at), c.coffee_stocks.map(s => new Stock(s.id, s.amount, s.memo))));
    }
    async add(userId: string, coffeeId: string, stock: Stock): Promise<Stock> {
        const result = await this.coffee_stocks.create({
            data: {
                user_id: userId,
                coffee_id: coffeeId,
                amount: stock.count,
                memo: stock.memo,
                place: stock.place,
            }
        });
        return new Stock(result.id, result.amount, result.place, result.memo);
    }
}