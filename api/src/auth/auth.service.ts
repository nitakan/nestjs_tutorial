import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/domain/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtPayload, Tokens } from './model/auth.model';

@Injectable()
export class AuthService {
    constructor(private userService: UserService, private jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.userService.signIn(email, password);
        if (user) {
            return user;
        }
        return null;
    }

    async login(user: User): Promise<Tokens> {
        const payload = JwtPayload.from(user);
        return new Tokens(this.jwtService.sign(payload.toPlainObject()));
    }
}