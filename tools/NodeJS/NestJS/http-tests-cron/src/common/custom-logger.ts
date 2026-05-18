import { ConsoleLogger, LoggerService, type LogLevel } from '@nestjs/common';

export class CustomLogger implements LoggerService {
  private readonly console = new ConsoleLogger();

  log(message: any, ...optionalParams: any[]) {
    this.console.log(message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    this.console.error(message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.console.warn(message, ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]) {
    this.console.debug(message, ...optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]) {
    this.console.verbose(message, ...optionalParams);
  }

  fatal(message: any, ...optionalParams: any[]) {
    this.console.fatal(message, ...optionalParams);
  }

  setLogLevels(levels: LogLevel[]) {
    this.console.setLogLevels(levels);
  }
}
