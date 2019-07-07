import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { ZombieItemInterface } from './zombie-item.inteface';
import { DecimalTransformer } from '../common/transformers/decimal.transformer';

@Entity('zombie_item')
export class ZombieItem {
  @ApiModelProperty()
  @PrimaryColumn({ type: 'int' })
  id: number;

  @ApiModelProperty()
  @Column({ type: 'text' })
  name: string;

  @ApiModelProperty()
  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    transformer: new DecimalTransformer(),
  })
  price: number;

  @ApiModelProperty()
  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @ApiModelProperty()
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @ApiModelPropertyOptional()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  constructor(data: Partial<ZombieItemInterface> = {}) {
    Object.assign(this, data);
  }
}
