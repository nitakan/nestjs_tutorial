
export class User {
    constructor(
        public id: string,
        public nickname: string,
        public email: string,
    ) {}
}

export class AuthUser {
    constructor(
        public id: string,
        public nickname: string,
        public email: string,
        public password: string,
    ) {}

    toUser(): User {
        return new User(this.id, this.nickname, this.email);
    }
}
