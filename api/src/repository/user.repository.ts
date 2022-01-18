import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/domain/repository_interface/user.repository";
import { BaseRepository } from "./base.repository";
import * as bcrypt from "bcrypt";
import { CreateUser, User, UserRole } from "src/domain/entity/user.entity";

@Injectable()
export class UserRepositoryImpl extends BaseRepository implements UserRepository {

    private async getRoles(isAdmin: boolean): Promise<UserRole[]> {
        return await this.roles
            .findMany({
                where: {
                    is_admin: isAdmin ? 1 : null,
                }
            })
            .then(roles => roles.map(role => new UserRole(role.id, role.name, role.is_admin == 1)));
    }


    async check(email: string, password: string): Promise<User | null> {
        const result = await this.users.findFirst({
            where: {
                email: email,
            },
            include: {
                user_roles: {
                    include: {
                        roles: true,
                    }
                },
                user_securities: true,
            }
        });
        if (!result) {
            return null;
        }

        const isCorrect = await bcrypt.compare(password, result.user_securities.password);
        if (!isCorrect) {
            return null;
        }

        return new User(
            result.id,
            result.nickname,
            result.email,
            result.user_roles.map(e => new UserRole(e.roles.id, e.roles.name, e.roles.is_admin == 1)),
        );
    }
    async all(skip: number = 1, take: number = 20): Promise<User[]> {
        return await this.users.findMany({
            skip: skip,
            take: take,
        }).then(list => list.map(item => new User(item.id, item.nickname, item.email, [])));
    }
    async create(user: CreateUser): Promise<User | null> {
        const roles = await this.getRoles(user.isAdmin);
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(user.password, salt);
        const r = roles.map(role => {
            return {role_id: role.id}
        });
        const created = await this.users.create({
            include: {
                user_securities: true,
                user_roles: {
                    include: {
                        roles: true,
                    }
                },
            },
            data: {
                email: user.email,
                nickname: user.nickname || '',
                user_securities: {
                    create: {
                        password: hashedPassword,
                    }
                },
                user_roles: {
                    createMany: { data: r }
                }
            },
        });

        if (created) {
            return new User(
                created.id,
                created.nickname,
                created.email,
                created.user_roles.map(e => new UserRole(e.roles.id, e.roles.name, e.roles.is_admin == 1)),
            );
        }


        return null;
    }

    async findBy(id: string): Promise<User | null> {
        const result = await this.users.findFirst({
            where: {
                id: id,
            },
            include: {
                user_roles: {
                    include: {
                        roles: true,
                    }
                },
                user_securities: true,
            }
        });
        if (!result) {
            return null;
        }
        return new User(
            result.id,
            result.nickname,
            result.email,
            result.user_roles.map(e => new UserRole(e.roles.id, e.roles.name, e.roles.is_admin == 1)),
        );
    }

}