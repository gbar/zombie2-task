import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { ZombieItemInterface } from '../zombie-item/zombie-item.inteface';
import { ZombieItem } from '../zombie-item/zombie-item.entity';

export interface ZombieInterface {
  name: string;
  items?: ZombieItemInterface[];
}

export class ZombieItemsTotalValue {
  @ApiModelProperty()
  PLN: number;

  @ApiModelProperty()
  EUR: number;
  
  @ApiModelProperty()
  USD: number;
}

export class ZombieAndItemsTotalValue {
  @ApiModelProperty()
  name: string;

  @ApiModelProperty()
  itemsTotalValue: ZombieItemsTotalValue;

  @ApiModelPropertyOptional({
    type: ZombieItem,
    isArray: true,
  })
  items?: ZombieItemInterface[];
}
