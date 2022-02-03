import { tmpdir } from "os";
import { Paginated, PaginationContext, PaginationMetaData } from "src/domain/entity/request.entity";
import { Repository } from "typeorm";
import { RepositoryInterface } from "../base.repository";

export abstract class BaseTypeORMRepository implements RepositoryInterface {
    async execute<T, R>(exec: Promise<T>, map: (input: T) => R): Promise<R> {
        const result = await exec;
        return map(result);
    }

    async executeWithPagination<T, R>(exec: Promise<[T, number]>, map: (input: T) => R, pagination: PaginationContext): Promise<Paginated<R>> {
        const result = await exec;
        
        if (typeof result[0] != 'object' || typeof result[1] != 'number') {
            return null;
        }

        const mapped = map(result[0]);
        const count = result[1];
        return Paginated.of(mapped, PaginationMetaData.from(pagination, count));            
    };
}