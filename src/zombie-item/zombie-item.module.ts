import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZombieItem } from './zombie-item.entity';
import { ZombieItemService } from './zombie-item.service';
import { ZombieItemController } from './zombie-item.controller';
import { ZombieItemProcessor } from './zombie-item.processor';
import { ZOMBIE_ITEM_SCHEDULER, UPDATE_ZOMBIE_ITEM_JOB } from './zombie-item.constant';
import { getCronToken } from '../cron/cron.utils';
import { CronSchedule } from '../cron/cron-schedule';

@Module({
  controllers: [ZombieItemController],
  imports: [TypeOrmModule.forFeature([ZombieItem])],
  exports: [ZombieItemService],
  providers: [
    ZombieItemService,
    ZombieItemProcessor,
    {
      provide: getCronToken(ZOMBIE_ITEM_SCHEDULER),
      useFactory: (
        zombieItemProcessor: ZombieItemProcessor,
      ) => new CronSchedule(
        ZOMBIE_ITEM_SCHEDULER,
        [
          {
            name: UPDATE_ZOMBIE_ITEM_JOB, cronTime: '0 30 0 * * *', callback: () => zombieItemProcessor.updateZombieItems(),
          },
        ],
      ),
      inject: [ZombieItemProcessor],
    },
  ],
})
export class ZombieItemModule { }
