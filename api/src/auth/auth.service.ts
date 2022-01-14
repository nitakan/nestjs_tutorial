import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/model/user.model';
import { UserService } from 'src/user/user.service';
import { JwtPayload, Tokens } from './model/auth.model';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<User> | null {
        const user = await this.userService.findOne(email);
        if (user && user.password == password) {
            return user.toUser();
        }
        return null;
    }

    async login(user: User): Promise<Tokens> {
        const payload = new JwtPayload(user.id, user.nickname, user.email, user.roles);
        return new Tokens(this.jwtService.sign(payload.toPlainObject()));
    }
}