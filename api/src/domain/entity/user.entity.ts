export class User {
    constructor(
        public id: string,
        public nickname: string,
        public email: string,
    ) {}
}

export class CreateUser {
    constructor(
        public nickname: string,
        public email: string,
        public password: string,
    ) {}
    
}

