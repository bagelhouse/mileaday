import { Module } from '@nestjs/common'
import { FirebaseLogger } from './logger'

@Module({
  providers: [FirebaseLogger],
  exports: [FirebaseLogger],
})
export class LoggerModule {}
