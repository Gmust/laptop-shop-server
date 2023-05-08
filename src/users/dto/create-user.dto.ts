import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {

  @ApiProperty({ example: 'Billie' })
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({example: 'billieherrington@gmail.com'})
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({example: 'coh12345'})
  @IsNotEmpty()
  readonly password: string;
}