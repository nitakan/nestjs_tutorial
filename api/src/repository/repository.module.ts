import { Module } from "@nestjs/common";
import { CoffeeRepository, StockRepository } from "src/domain/repository_interface/coffee.repository";
import { UserRepository } from "../domain/repository_interface/user.repository";
import { CoffeeRepositoryImpl, StockRepositoryImpl } from "./prisma/coffee.repository";
import { UserRepositoryImpl } from "./prisma/user.repository";


@Module({
    providers: [
        {
            provide: UserRepository,
            useClass: UserRepositoryImpl,
        },
        {
            provide: CoffeeRepository,
            useClass: CoffeeRepositoryImpl,
        },
        {
            provide: StockRepository,
            useClass: StockRepositoryImpl,
        },
    ],
    exports: [UserRepository, StockRepository, CoffeeRepository],
  })
  export class RepositoryModule { }
  