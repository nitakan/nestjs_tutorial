import { Role } from "src/decorator/role.decorator";

export class Tokens {
    constructor(
        public access_token: string,
    ) { }
}

export class JwtPayload {
    constructor(
    public sub: string,
    public nickName: string,
    public email: string,
    public roles: Array<Role>
    ) {}

    toPlainObject() {
        return Object.assign({}, this);
    }
}