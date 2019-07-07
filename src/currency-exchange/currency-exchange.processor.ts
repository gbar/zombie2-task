import { Logger } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { UPDATE_CURRENCY_JOB, CURRENCY_EXCHANGE_SCHEDULER } from './currency-exchange.constant';
import { CurrencyExchangeProcessorInterface } from './currency-exchange.interface';
import { CurrencyExchangeService } from './currency-exchange.service';

@Injectable()
export class CurrencyExchangeProcessor implements CurrencyExchangeProcessorInterface {
  private readonly logger = new Logger(CURRENCY_EXCHANGE_SCHEDULER);

  constructor(
    private readonly currencyExchangeService: CurrencyExchangeService,
  ) { }

  async updateCurrencies(): Promise<void> {
    const currencies = await this.currencyExchangeService.getCurrencies();
    const result = await this.currencyExchangeService.upsertMany(currencies);
  
    this.logger.log(`[${UPDATE_CURRENCY_JOB}] ${result.length} currencies has been updated.`);
  }
}
