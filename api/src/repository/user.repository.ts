import { BadRequestException, Injectable, UnprocessableEntityException } from "@nestjs/common";
import { UserRepository } from "src/domain/repository_interface/user.repository";
import { BaseRepository } from "./base.repository";
import * as bcrypt from "bcrypt";
import { CreateUser, User } from "src/domain/entity/user.entity";
import { Prisma } from "@prisma/client";

@Injectable()
export class UserRepositoryImpl extends BaseRepository implements UserRepository {
    async check(email: string, password: string): Promise<User | null> {
        const result = await this.users.findFirst({
            where: {
                email: email,
            },
            include: {
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
        );
    }
    async all(skip: number = 1, take: number = 20): Promise<User[]> {
        return await this.users.findMany({
            skip: skip,
            take: take,
        }).then(list => list.map(item => new User(item.id, item.nickname, item.email)));
    }
    async create(user: CreateUser): Promise<User | null> {

        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(user.password, salt);
        try {
            const created = await this.users.create({
                include: {
                    user_securities: true,
                },
                data: {
                    email: user.email,
                    nickname: user.nickname || '',
                    user_securities: {
                        create: {
                            password: hashedPassword,
                        }
                    },
                },
            });

            if (created) {
                return new User(
                    created.id,
                    created.nickname,
                    created.email,
                );
            }
        } catch (e) {
            console.log(e);
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                throw new UnprocessableEntityException({
                    property: e.meta,
                    code: e.code,
                });
            }
            throw new BadRequestException();
        }     


        return null;
    }

    async findBy(id: string): Promise<User | null> {
        const result = await this.users.findFirst({
            where: {
                id: id,
            },
            include: {
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
        );
    }

}