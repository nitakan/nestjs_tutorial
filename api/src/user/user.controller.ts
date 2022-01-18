import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/decorator/public.decorator';
import { Roles } from 'src/decorator/role.decorator';
import { Role } from 'src/domain/entity/role.entity';
import { CreateUser, User } from 'src/domain/entity/user.entity';
import { CreateUserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Public()
    @Post('/signup')
    async signUp(@Body() body: CreateUserDto) {
        const user = new CreateUser(body.nickname, body.mail, body.password, body.isAdmin || false);
        await this.userService.signUp(user);
        return true;
    }
}
