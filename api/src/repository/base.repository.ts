import { Pagination } from "src/domain/entity/request.entity";
export type Proc<T> = () => Promise<T>;
export interface RepositoryInterface {
}