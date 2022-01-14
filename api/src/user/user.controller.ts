import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/model/jwt/jwt-auth.guard';
import { Public } from 'src/decorator/public.decorator';

@Controller('user')
@Public()
export class UserController {
    @Get('test')
    async getTest() {
        return {message: 'test'};
    }

    @Get('test2')
    @UseGuards(JwtAuthGuard)
    async getTest2() {
        return {message: 'test2'};
    }
}
