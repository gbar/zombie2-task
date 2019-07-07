import { Injectable } from '@nestjs/common';
import { CronJob } from 'cron';
import { IAdvancedProcessor } from './cron.interface';

@Injectable()
export class CronSchedule {
  private static prefix: string;
  private static readonly jobs = new Map<string, CronJob>();

  constructor(prefix: string = 'default', processors?: IAdvancedProcessor[]) {
    CronSchedule.prefix = prefix;
    processors.forEach((processor: IAdvancedProcessor) => {
      const job = new CronJob({
        cronTime: processor.cronTime,
        onTick: processor.callback,
        onComplete: null,
        start: true,
        timeZone: 'UTC',
        runOnInit: true,
      });

      CronSchedule.jobs.set(`${prefix}_${processor.name}`, job);
    });
  }

  static getJob(name: string): CronJob {
    return this.jobs.get(`${this.prefix}_${name}`);
  }

  static runJob(name: string): void {
    return this.getJob(name).start();
  }

  static cancelJob(name: string): void {
    return this.getJob(name).stop();
  }
}
