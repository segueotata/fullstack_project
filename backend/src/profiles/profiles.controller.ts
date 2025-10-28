// src/profiles/profiles.controller.ts

import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Post,
  Body,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { Profile } from './entities/profile.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Swagger decorators
import { CreateProfileDto } from './dto/create-profile.dto';

@ApiTags('profiles') // Agrupa as rotas deste controlador sob "profiles" no Swagger
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo perfil de usuário.' })
  @ApiResponse({
    status: 201,
    description: 'Perfil criado com sucesso.',
    type: Profile,
  })
  @ApiResponse({ status: 409, description: 'E-mail ou Username já em uso.' })
  async create(@Body() createProfileDto: CreateProfileDto): Promise<Profile> {
    // 1. Recebe o objeto validado pelo DTO no corpo da requisição
    // 2. Chama o Service para persistir no banco
    return this.profilesService.create(createProfileDto);
  }

  // ROTA: GET /profiles
  @Get()
  @ApiOperation({ summary: 'Recupera todos os perfis' }) // Descrição da operação no Swagger
  findAll(): Promise<Profile[]> {
    return this.profilesService.findAll();
  }

  // ROTA: GET /profiles/:id
  @ApiOperation({ summary: 'Recupera um perfil pelo ID' }) // Descrição da operação no Swagger
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Profile> {
    const profile = await this.profilesService.findOne(parseInt(id, 10));

    if (!profile) {
      throw new NotFoundException(`Perfil com ID ${id} não encontrado.`);
    }

    return profile;
  }
}
