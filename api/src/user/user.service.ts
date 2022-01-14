import { Injectable } from '@nestjs/common';
import { AuthUser, User } from './model/user.model';

@Injectable()
export class UserService {
    private readonly users: Array<AuthUser> = [
        new AuthUser('1', 'TEST USER', 'test1@nitakan.net', 'password'),
    ];

    async findOne(email: string): Promise<AuthUser> {
        return this.users.find(user => user.email == email);
    }

    async allUsers(): Promise<Array<User>> {
        return this.users.map(user => user.toUser());
    }
}
