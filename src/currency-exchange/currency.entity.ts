import { PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, Entity } from 'typeorm';
import { CurrencyCodes } from './currency-exchange.enum';
import { CurrencyExchangeRateItemDtoInterface } from './currency-exchange.interface';
import { DecimalTransformer } from '../common/transformers/decimal.transformer';

@Entity('currency')
export class Currency {
  @PrimaryColumn({ type: 'text' })
  code: CurrencyCodes;

  @Column({ type: 'text' })
  currency: string;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 4,
    transformer: new DecimalTransformer(),
  })
  bid: number;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 4,
    transformer: new DecimalTransformer(),
  })
  ask: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  constructor(data: Partial<CurrencyExchangeRateItemDtoInterface> = {}) {
    Object.assign(this, data);
  }
}
