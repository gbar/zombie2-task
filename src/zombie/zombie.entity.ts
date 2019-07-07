import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column } from 'typeorm';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { ZombieInterface } from './zombie.interface';
import { ZombieItem } from '../zombie-item/zombie-item.entity';

@Entity('zombie')
export class Zombie {
  @ApiModelProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiModelProperty()
  @Column({ type: 'text' })
  name: string;

  @ApiModelProperty({
    type: ZombieItem,
    isArray: true,
  })
  @Column({ type: 'jsonb', default: '[]' })
  items: ZombieItem[];

  @ApiModelProperty()
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @ApiModelPropertyOptional()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  constructor(data: Partial<ZombieInterface> = {}) {
    Object.assign(this, data);
  }
}