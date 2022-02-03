import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoffeeRepository, StockRepository } from "src/domain/repository_interface/coffee.repository";
import { UserRepository } from "../domain/repository_interface/user.repository";
import { CoffeeRepositoryPrismaImpl, StockRepositoryImpl } from "./prisma/coffee.repository";
import { UserRepositoryImpl } from "./prisma/user.repository";
import { CoffeeRepositoryTypeORMImpl } from "./typeorm/coffees.repository";
import { CoffeeEntity } from "./typeorm/entity/coffee.entity";


@Module({
    imports: [
        TypeOrmModule.forFeature([CoffeeEntity]),
    ],
    providers: [
        {
            provide: UserRepository,
            useClass: UserRepositoryImpl,
        },
        {
            provide: CoffeeRepository,
            // useClass: CoffeeRepositoryPrismaImpl,
            useClass: CoffeeRepositoryTypeORMImpl,
        },
        {
            provide: StockRepository,
            useClass: StockRepositoryImpl,
        },
    ],
    exports: [UserRepository, StockRepository, CoffeeRepository, TypeOrmModule],
  })
  export class RepositoryModule { }
  