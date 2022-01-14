import { Role } from "src/decorator/role.decorator";

export class User {
    constructor(
        public id: string,
        public nickname: string,
        public email: string,
        public roles: Array<Role>,
    ) {}
}

export class AuthUser {
    constructor(
        public id: string,
        public nickname: string,
        public email: string,
        public password: string,
        public roles: Array<Role>,
    ) {}

    toUser(): User {
        return new User(this.id, this.nickname, this.email, this.roles);
    }
}
