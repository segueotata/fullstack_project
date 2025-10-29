// src/profiles/dto/create-profile.dto.ts

import { IsString, IsEmail, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Swagger decorators

export class CreateProfileDto {
  @ApiProperty({ example: 1, description: 'ID da classe do perfil' })
  @IsInt()
  permissions: number;

  @ApiProperty({ example: 'user_1', description: 'Unique username' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'user.1@hoster.com',
    description: 'Unique email address',
  })
  @IsEmail() // Valida o formato do e-mail
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'yuAy4Y-SzBGOYBKngwm7xw',
    description: 'User password hash',
  })
  @IsString()
  @IsNotEmpty()
  password_hash: string;
}
