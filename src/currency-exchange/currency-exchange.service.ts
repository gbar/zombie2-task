import { Injectable } from '@nestjs/common';
import { ConfigService } from 'nestjs-config';
import axios from 'axios';
import {
  CurrencyExchangeRateDtoResponse,
  CurrencyExchangeRateItemDtoInterface,
  CurrenciesInterface
} from './currency-exchange.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Currency } from './currency.entity';
import { Repository } from 'typeorm';
import { CurrencyCodes } from './currency-exchange.enum';
import { Decimal } from 'decimal.js';

@Injectable()
export class CurrencyExchangeService {
  constructor(
    @InjectRepository(Currency) private readonly repository: Repository<Currency>,
    private readonly config: ConfigService,
  ) { }

  public async getCurrencies(): Promise<CurrencyExchangeRateItemDtoInterface[]> {
    const { data } =
      await axios.get<CurrencyExchangeRateDtoResponse[]>(this.config.get('config.nbpExchangeRateEndpoint'))

    return data[0].rates.filter(rate => !!CurrencyCodes[rate.code]);
  }

  public async upsertMany(items: CurrencyExchangeRateItemDtoInterface[]): Promise<Currency[]> {
    const currencies = await this.repository.find();
    const currenciesObject = this.transformToObject(currencies);
    const upsert = items.map(item => {
      const currency = currenciesObject[item.code];

      return this.repository.create({ ...currency, ...item });
    });

    return this.repository.save(upsert);
  }

  public findByCodes(codes: CurrencyCodes[]): Promise<Currency[]> {
    return this.repository.findByIds(codes);
  }

  public async transformByCodes(codes: CurrencyCodes[]): Promise<Partial<CurrenciesInterface>> {
    const currencies = await this.repository.findByIds(codes);

    return this.transformToObject(currencies);
  }

  private transformToObject(currencies: Currency[]): Partial<CurrenciesInterface> {
    const currenciesObject = {};

    currencies.forEach(currency => {
      currenciesObject[currency.code] = currency;
    });

    return currenciesObject;
  }

  public getExchangeValue(value: number, currencyRate: number): number {
    return Decimal.div(value, currencyRate).toDecimalPlaces(2).toNumber();
  }
}