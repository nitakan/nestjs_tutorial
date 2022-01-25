import { BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CoffeeStocks, CreateCoffee } from "src/domain/entity/coffee.model";
import { PaginationContext, Paginated } from "src/domain/entity/request.entity";
import { CoffeeRepository } from "src/domain/repository_interface/coffee.repository";
import { Repository } from "typeorm";
import { BaseTypeORMRepository } from "./base.repository";
import { CoffeeEntity } from "./entity/coffee.entity";

export class CoffeeRepositoryTypeORMImpl extends BaseTypeORMRepository implements CoffeeRepository {

    constructor(
        @InjectRepository(CoffeeEntity)
        private readonly dataSource: Repository<CoffeeEntity>,
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
        throw new BadRequestException();
    }

}