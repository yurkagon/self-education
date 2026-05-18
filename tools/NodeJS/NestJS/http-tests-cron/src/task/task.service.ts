import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  @Cron(CronExpression.EVERY_30_SECONDS)
  handleCron() {
    this.logger.log('Every 30 seconds');
  }

  @Interval(1000)
  handleInterval() {
    this.logger.log('Every 1 second');
  }

  @Timeout(1000)
  handleTimeout() {
    this.logger.log('After 1 second after startup');
  }
}
