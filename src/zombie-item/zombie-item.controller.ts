import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode } from '@nestjs/common';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { ZombieItem } from './zombie-item.entity';
import { ZombieItemService } from './zombie-item.service';

@ApiUseTags('Zombie Item')
@Controller('zombie-item')
export class ZombieItemController {
  constructor(private readonly service: ZombieItemService) { }

  @Get()
  @ApiResponse({
    status: 200,
    type: ZombieItem,
    description: 'Available items collection',
    isArray: true
  })
  getList(): Promise<ZombieItem[]> {
    return this.service.getAvailableItems();
  }
}