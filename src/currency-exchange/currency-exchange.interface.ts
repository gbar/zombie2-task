import { CurrencyCodes } from './currency-exchange.enum';
import { Currency } from './currency.entity';

export interface CurrencyExchangeRateItemDtoInterface {
  code: CurrencyCodes;
  currency: string;
  bid: number;
  ask: number;
}

export interface CurrencyExchangeRateDtoResponse {
  table: string;
  no: string;
  tradingDate: string;
  effectiveDate: string;
  rates: CurrencyExchangeRateItemDtoInterface[];
}

export interface CurrencyExchangeProcessorInterface {
  updateCurrencies(): Promise<void>;
}

export type CurrenciesInterface = { [code in CurrencyCodes]: Currency };