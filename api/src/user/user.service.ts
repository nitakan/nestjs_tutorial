import { Injectable } from '@nestjs/common';
import { CreateUser, User } from 'src/domain/entity/user.entity';
import { UserRepository } from 'src/domain/repository_interface/user.repository';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}
    async signIn(email: string, password: string): Promise<User> {
        return await this.userRepository.check(email, password);
    }

    async signUp(user: CreateUser): Promise<User> {
        return await this.userRepository.create(user);
    }

    async allUsers(): Promise<User[]> {
        return await this.userRepository.all();
    }
}
