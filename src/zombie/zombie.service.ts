import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Zombie } from './zombie.entity';
import { Repository, DeleteResult } from 'typeorm';
import { CreateZombieDto, UpdateZombieDto } from './zombie.dto';
import { ZombieAndItemsTotalValue } from './zombie.interface';
import { ZombieItemService } from '../zombie-item/zombie-item.service';
import { CurrencyExchangeService } from '../currency-exchange/currency-exchange.service';
import { CurrencyCodes } from '../currency-exchange/currency-exchange.enum';
import { CurrenciesInterface } from '../currency-exchange/currency-exchange.interface';

@Injectable()
export class ZombieService {
  constructor(
    @InjectRepository(Zombie) private readonly repository: Repository<Zombie>,
    private readonly zombieItemService: ZombieItemService,
    private readonly currencyExchangeService: CurrencyExchangeService,
  ) { }

  public async getList(): Promise<ZombieAndItemsTotalValue[]> {
    const zombies = await this.repository.find();

    return this.addItemsTotalValueDetails(zombies);
  }

  private async addItemsTotalValueDetails(entities: Zombie[]): Promise<ZombieAndItemsTotalValue[]> {
    const currencies = await this.currencyExchangeService.transformByCodes([CurrencyCodes.EUR, CurrencyCodes.USD]);

    return entities.map(entity => this.addItemsTotalValue(entity, currencies));
  }

  private addItemsTotalValue(
    zombie: Zombie,
    currencies: Partial<CurrenciesInterface>
  ): ZombieAndItemsTotalValue {
    const itemsTotalValue: number =
      zombie.items.reduce((previousValue, currentValue) => (previousValue + currentValue.price), 0);

    return {
      ...zombie,
      itemsTotalValue: {
        PLN: itemsTotalValue,
        EUR: this.currencyExchangeService.getExchangeValue(itemsTotalValue, currencies[CurrencyCodes.EUR].ask),
        USD: this.currencyExchangeService.getExchangeValue(itemsTotalValue, currencies[CurrencyCodes.USD].ask),
      },
    };
  }

  public async getOne(id: string): Promise<ZombieAndItemsTotalValue> {
    const currencies = await this.currencyExchangeService.transformByCodes([CurrencyCodes.EUR, CurrencyCodes.USD]);

    return this.repository
      .findOneOrFail(id)
      .then(data => this.addItemsTotalValue(data, currencies));
  }

  public async create(data: CreateZombieDto): Promise<Zombie> {
    const items = data.items ? await this.zombieItemService.getByIds(data.items) : []

    return this.repository.save(
      this.repository.create({ ...data, items }),
    );
  }

  public async update(id: string, data: UpdateZombieDto): Promise<Zombie> {
    const zombie = await this.repository.findOneOrFail(id);
    const items = data.items ? await this.zombieItemService.getByIds(data.items) : []

    await this.repository.update(zombie.id, { ...data, items });

    return Object.assign(zombie, { ...data, items });
  }

  public async delete(id: string): Promise<DeleteResult> {
    await this.repository.findOneOrFail(id);

    return this.repository.delete(id);
  }
}