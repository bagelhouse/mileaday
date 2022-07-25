import { Injectable } from '@nestjs/common'
import { LoggerService } from '@nestjs/common';
import { logger } from 'firebase-functions'

@Injectable()
export class FirebaseLogger implements LoggerService {

  log(message: any, ...optionalParams: any[]) {
    logger.log(JSON.stringify({ "severity": "INFO", "message": message }));
  }

  error(message: any, ...optionalParams: any[]) {
    logger.log(JSON.stringify({"severity": "ERROR", "message": message }));
  }

  warn(message: any, ...optionalParams: any[]) {
    logger.log(JSON.stringify({ "severity": "WARNING", "message": message }));
  }

  debug?(message: any, ...optionalParams: any[]) {
    logger.log(JSON.stringify({ "severity": "DEBUG", "message": message }));
  }

  verbose?(message: any, ...optionalParams: any[]) {
  }
}