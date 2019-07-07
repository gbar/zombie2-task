import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode } from '@nestjs/common';
import { Zombie } from './zombie.entity';
import { ZombieService } from './zombie.service';
import { CreateZombieDto, UpdateZombieDto } from './zombie.dto';
import { ZombieAndItemsTotalValue } from './zombie.interface';
import { UuidValidationPipe } from '../common/validation-pipes/uuid.validation-pipe';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';

@ApiUseTags('Zombie')
@Controller('zombie')
export class ZombieController {
  constructor(private readonly service: ZombieService) { }

  @Get()
  @ApiResponse({
    status: 200,
    type: ZombieAndItemsTotalValue,
    description: 'Zombies collection',
    isArray: true
  })
  getList(): Promise<ZombieAndItemsTotalValue[]> {
    return this.service.getList();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: ZombieAndItemsTotalValue,
    description: 'Single zombie',
  })
  getOne(@Param('id', UuidValidationPipe) id: string): Promise<ZombieAndItemsTotalValue> {
    return this.service.getOne(id);
  }

  @Post()
  @ApiResponse({
    status: 201,
    type: Zombie,
    description: 'Zombie created',
  })
  create(@Body() createDto: CreateZombieDto): Promise<Zombie> {
    return this.service.create(createDto);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    type: Zombie,
    description: 'Zombie updated',
  })
  update(
    @Param('id', UuidValidationPipe) id: string,
    @Body() updateDto: UpdateZombieDto,
  ): Promise<Zombie> {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 204,
    description: 'Zombie deleted',
  })
  async delete(@Param('id', UuidValidationPipe) id: string): Promise<void> {
    await this.service.delete(id);
  }
}