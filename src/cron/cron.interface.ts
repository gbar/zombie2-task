import { CronCommand } from 'cron';

export interface IAdvancedProcessor {
  name: string;
  cronTime: string;
  callback: CronCommand;
}
