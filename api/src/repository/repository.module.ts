import { Module } from "@nestjs/common";
import { UserRepository } from "../domain/repository_interface/user.repository";
import { UserRepositoryImpl } from "./user.repository";


@Module({
    providers: [
        {
            provide: UserRepository,
            useClass: UserRepositoryImpl,
        },
    ],
    exports: [UserRepository],
  })
  export class RepositoryModule { }
  