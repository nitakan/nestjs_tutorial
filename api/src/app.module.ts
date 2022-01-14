import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TestModule } from './test/test.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/model/jwt/jwt-auth.guard';
import { RolesGuard } from './decorator/role.decorator';

@Module({
  imports: [CoffeesModule, TestModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_GUARD,
    useClass: JwtAuthGuard,
  }, {
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).exclude('test').forRoutes('*');
  }
}

