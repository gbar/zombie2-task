import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';
import axios from 'axios';
import { ZombieItemsDtoInterface, ZombieItemInterface } from './zombie-item.inteface';
import { InjectRepository } from '@nestjs/typeorm';
import { ZombieItem } from './zombie-item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ZombieItemService {
  constructor(
    private readonly config: ConfigService,
    @InjectRepository(ZombieItem) private readonly repository: Repository<ZombieItem>,
  ) { }

  public getAvailableItems(): Promise<ZombieItem[]> {
    return this.repository.find({ isActive: true });
  }

  public async getItems(): Promise<ZombieItemInterface[]> {
    const { data } =
      await axios.get<ZombieItemsDtoInterface>(this.config.get('config.zombieApiItemsEndpoint'))

    return data.items;
  }

  public async upsertMany(items: ZombieItemInterface[]): Promise<ZombieItem[]> {
    const existingItems = await this.repository.find();

    const nonExistingItems = items
      .filter(item => !existingItems.find(existingItem => existingItem.id === item.id))
      .map(item => this.repository.create({ ...item, isActive: true }));

    const existingWithUpdates = existingItems.map(existingItem => {
      const updatedItem = items.find(item => item.id === existingItem.id);

      return updatedItem === undefined ?
        { ...existingItem, isActive: false } :
        { ...existingItem, price: updatedItem.price };
    });

    return this.repository.save([
      ...existingWithUpdates,
      ...nonExistingItems,
    ]);
  }

  public async getByIds(ids: number[]): Promise<ZombieItem[]> {
    const items = await this.repository.findByIds(ids, {
      where: {
        isActive: true,
      },
    });

    if (ids.length !== items.length) {
      throw new BadRequestException('Some items are missing');
    }

    return items;
  }
}
