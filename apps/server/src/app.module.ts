import {  Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './features/user/user.module';
import { FirebaseLogger } from './logger/logger';
import { StreakService } from './features/streak/streak.service';

@Module({
  imports: [UserModule, FirebaseLogger],
  controllers: [AppController],
  providers: [AppService, StreakService],
})
export class AppModule {

}