import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zombie } from './zombie.entity';
import { ZombieService } from './zombie.service';
import { ZombieController } from './zombie.controller';
import { ZombieItemModule } from '../zombie-item/zombie-item.module';
import { CurrencyExchangeModule } from '../currency-exchange/currency-exchange.module';

@Module({
  controllers: [ZombieController],
  imports: [
    TypeOrmModule.forFeature([Zombie]),
    ZombieItemModule,
    CurrencyExchangeModule,
  ],
  providers: [ZombieService]
})
export class ZombieModule {}