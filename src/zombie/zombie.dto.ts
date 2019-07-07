import { MinLength, IsString, IsOptional, IsArray, IsInt, IsPositive, ArrayMaxSize } from 'class-validator';
import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';

const nameMetadata = {
  description: 'Name of the Zombie',
  type: ['string'],
  example: 'JS Zombie',
}

const itemsMetadata = {
  description: 'List of the Zombie\'s items as IDs',
  isArray: true,
  type: ['integer'],
  example: [1,2,3,4],
};

export class CreateZombieDto {
  @ApiModelProperty(nameMetadata)
  @IsString()
  @MinLength(3)
  name: string;

  @ApiModelPropertyOptional(itemsMetadata)
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(5)
  @IsInt({ each: true })
  @IsPositive({ each: true })
  items?: number[];
}

export class UpdateZombieDto {
  @ApiModelPropertyOptional(nameMetadata)
  @IsOptional()
  @IsString()
  @MinLength(3)
  name?: string;

  @ApiModelPropertyOptional(itemsMetadata)
  @IsOptional()
  @IsArray()
  @ArrayMaxSize(5)
  @IsInt({ each: true })
  @IsPositive({ each: true })
  items?: number[];
}
