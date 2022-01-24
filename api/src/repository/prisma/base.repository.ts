import { INestApplication, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client"
import { Pagination, PaginationContext } from "src/domain/entity/request.entity";
export type Proc<T> = () => Promise<T>;

export interface RepositoryInterface {
    withPagination<T>(proc: Proc<T>): Promise<Pagination<T>>;
}
export class BaseRepository extends PrismaClient implements OnModuleInit {
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