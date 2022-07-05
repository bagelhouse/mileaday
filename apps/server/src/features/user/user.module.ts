import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { FirebasePreauthMiddleware } from './auth.middleware';

@Module({
  imports: [],
  providers: [UserService],
  controllers: [
    UserController
  ],
  exports: [UserService]
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(FirebasePreauthMiddleware)
      .forRoutes({path: 'user/*', method: RequestMethod.ALL});
  }
}