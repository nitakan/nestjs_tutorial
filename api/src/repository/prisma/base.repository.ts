import { INestApplication, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client"
import { Pagination, PaginationContext } from "src/domain/entity/request.entity";
import { RepositoryInterface } from "../base.repository";

export class BasePrismaRepository extends PrismaClient implements OnModuleInit, RepositoryInterface {
    async onModuleInit() {
        await this.$connect();
    }


    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }

    $(pagination: PaginationContext) {
        return {
            skip: pagination.skip,
            take: pagination.take,
        }
    }

}