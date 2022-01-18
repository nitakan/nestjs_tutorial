import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstatnts } from "src/auth/constants";
import { User } from "src/domain/entity/user.entity";
import { JwtPayload } from "../auth.model";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                ignoreExpiration: false,
                secretOrKey: jwtConstatnts.secret,
            }
        );
    }

    async validate(payload: any): Promise<User> {
        const p = payload as JwtPayload;
        return new User(p.sub, p.nickName, p.email, p.roles);
    }

}