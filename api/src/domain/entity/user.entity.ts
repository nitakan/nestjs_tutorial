import { Role } from "./role.entity";

export class UserRole {
    constructor(
        public id: number,
        public name: string,
        public isAdmin: boolean,
    ) {}
}

export class User {
    constructor(
        public id: string,
        public nickname: string,
        public email: string,
        public roles: Array<UserRole>,
    ) {}
}

export class CreateUser {
    constructor(
        public nickname: string,
        public email: string,
        public password: string,
        public isAdmin: boolean,
    ) {}
    
}

