import { Injectable } from '@nestjs/common';
import { Role } from 'src/decorator/role.decorator';
import { AuthUser, User } from './model/user.model';

@Injectable()
export class UserService {
    private readonly users: Array<AuthUser> = [
        new AuthUser('1', 'ADMIN USER', 'admin@nitakan.net', 'password', [Role.Admin, Role.User]),
        new AuthUser('2', 'TEST USER', 'test1@nitakan.net', 'password', [Role.User]),
    ];

    async findOne(email: string): Promise<AuthUser> {
        return this.users.find(user => user.email == email);
    }

    async allUsers(): Promise<Array<User>> {
        return this.users.map(user => user.toUser());
    }
}
