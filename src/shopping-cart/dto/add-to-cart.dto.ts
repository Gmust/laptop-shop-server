import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class AddToCartDto {
  @ApiProperty({ example: 'Billie' })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ example: 1 })
  @IsOptional()
  readonly userId?: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  readonly laptopId: string;
}
