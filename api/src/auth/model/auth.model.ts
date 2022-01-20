import { User } from "src/domain/entity/user.entity";


export class Tokens {
    constructor(
        public access_token: string,
    ) { }
}

export class JwtPayload {
    private constructor(
        public sub: string,
        public nickName: string,
        public email: string,
    ) { }

    static from(user: User): JwtPayload {
        return new JwtPayload(user.id, user.nickname, user.email);
    }

    toPlainObject() {
        return Object.assign({}, this);
    }

    public toUser(): User {
        return new User(this.sub, this.nickName, this.email);
    }

}