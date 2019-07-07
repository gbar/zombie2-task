import { Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { UPDATE_ZOMBIE_ITEM_JOB, ZOMBIE_ITEM_SCHEDULER } from './zombie-item.constant';
import { ZombieItemProcessorInterface } from './zombie-item.inteface';
import { ZombieItemService } from './zombie-item.service';

@Injectable()
export class ZombieItemProcessor implements ZombieItemProcessorInterface {
  private readonly logger = new Logger(ZOMBIE_ITEM_SCHEDULER);

  constructor(
    private readonly zombieItemService: ZombieItemService,
  ) { }

  async updateZombieItems(): Promise<void> {
    const items = await this.zombieItemService.getItems();
    const result = await this.zombieItemService.upsertMany(items);

    this.logger.log(`[${UPDATE_ZOMBIE_ITEM_JOB}] ${result.length} zombie items has been updated.`);
  }
}
