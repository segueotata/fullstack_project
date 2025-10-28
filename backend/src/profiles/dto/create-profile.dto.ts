// src/profiles/dto/create-profile.dto.ts

import { IsString, IsEmail, IsNotEmpty, IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Swagger decorators

export class CreateProfileDto {
  @ApiProperty({ example: 1, description: 'ID da classe do perfil' })
  @IsInt()
  permissions: number;

  @ApiProperty({ example: 'usuario123', description: 'Nome de usuário único' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    example: 'email@hoster.com',
    description: 'Endereço de e-mail único',
  })
  @IsEmail() // Valida o formato do e-mail
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'cb611c0ff30a98dc92199d7fdc393bba8bf0f7756f3515664a60b01c4a083160',
    description: 'Hash da senha do usuário',
  })
  @IsString()
  @IsNotEmpty()
  password_hash: string;
}
