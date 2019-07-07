import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyExchangeService } from './currency-exchange.service';
import { Currency } from './currency.entity';
import { CurrencyExchangeProcessor } from './currency-exchange.processor';
import { CURRENCY_EXCHANGE_SCHEDULER, UPDATE_CURRENCY_JOB } from './currency-exchange.constant';
import { getCronToken } from '../cron/cron.utils';
import { CronSchedule } from '../cron/cron-schedule';

@Module({
  imports: [TypeOrmModule.forFeature([Currency])],
  exports: [CurrencyExchangeService],
  providers: [
    CurrencyExchangeService,
    CurrencyExchangeProcessor,
    {
      provide: getCronToken(CURRENCY_EXCHANGE_SCHEDULER),
      useFactory: (
        currencyExchangeProcessor: CurrencyExchangeProcessor,
      ) => new CronSchedule(
        CURRENCY_EXCHANGE_SCHEDULER,
        [
          {
            name: UPDATE_CURRENCY_JOB, cronTime: '0 45 0 * * *', callback: () => currencyExchangeProcessor.updateCurrencies(),
          },
        ],
      ),
      inject: [CurrencyExchangeProcessor],
    },
  ],
})
export class CurrencyExchangeModule {}
