import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/model/jwt/jwt-auth.guard';
import { Public } from 'src/decorator/public.decorator';
import { Role, Roles } from 'src/decorator/role.decorator';

@Controller('user')
export class UserController {
    @Get('test')
    @Roles(Role.Admin)
    async getTest() {
        return {message: 'test'};
    }

    @Get('test2')
    async getTest2() {
        return {message: 'test2'};
    }
}
