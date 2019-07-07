import { Inject } from '@nestjs/common';
import { getCronToken } from './cron.utils';

export function InjectCron(name?: string): ParameterDecorator {
  return Inject(getCronToken(name));
}
