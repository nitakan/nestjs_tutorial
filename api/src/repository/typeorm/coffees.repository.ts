import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { CoffeeStocks, CreateCoffee } from "src/domain/entity/coffee.model";
import { PaginationContext, Paginated } from "src/domain/entity/request.entity";
import { CoffeeRepository } from "src/domain/repository_interface/coffee.repository";
import { Connection, Repository } from "typeorm";
import { BaseTypeORMRepository } from "./base.repository";
import { CoffeeEntity, CoffeeStockEntity } from "./entity/coffee.entity";

export class CoffeeRepositoryTypeORMImpl extends BaseTypeORMRepository implements CoffeeRepository {

    constructor(
        @InjectRepository(CoffeeEntity)
        private readonly dataSource: Repository<CoffeeEntity>,

        @InjectConnection()
        private readonly connection: Connection,
    ) {
        super();
    }

    async all(userId: string, pagination: PaginationContext): Promise<Paginated<CoffeeStocks[]>> {
        return await this.executeWithPagination(
            this.dataSource.findAndCount({
                where: {
                    userId: userId,
                },
                relations: [
                    'stocks'
                ],
                take: pagination.take,
                skip: pagination.skip,
            }),
            (result) => result.map(entity => entity.convert()),
            pagination,
        );
    }
    async findBy(id: string): Promise<CoffeeStocks> {
        return this.execute(
            this.dataSource.findOne(id),
            (entity) => entity.convert(),
        );
    }
    async create(userId: string, coffee: CreateCoffee): Promise<CoffeeStocks> {
        const created = this.dataSource.create();
        created.userId = userId;
        created.name = coffee.name;
        created.memo = coffee.memo;
        var coffeeId: string;
console.log(coffee);
        await this.connection.manager.transaction(async (tran) => {
            const saved = await tran.save(created);
            coffeeId = saved.id;

            for (const stock of coffee.stocks) {
                const s = new CoffeeStockEntity();
                s.userId = userId;
                s.coffeeId = coffeeId;
                s.amount = stock.count;
                s.memo = stock.memo;
                s.place = stock.place;
                await tran.save(s);
            }
        });
        return await this.findBy(coffeeId);
    }

}