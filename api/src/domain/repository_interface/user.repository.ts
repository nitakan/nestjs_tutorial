import { CreateUser, User } from "../entity/user.entity";


export abstract class UserRepository {
    abstract findBy(id: string): Promise<User | null>;
    abstract check(email: string, password: string): Promise<User | null>;
    abstract all(skip?: number, take?: number): Promise<User[]>;
    abstract create(user: CreateUser): Promise<User | null>;
}
