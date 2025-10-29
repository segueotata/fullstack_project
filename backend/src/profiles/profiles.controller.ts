// src/profiles/profiles.controller.ts

import {
  Controller,
  Get,
  Param,
  NotFoundException,
  Post,
  Body,
  Delete,
  HttpCode,
  HttpStatus,
  Patch,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { Profile } from './entities/profile.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'; // Swagger decorators
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

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

  // ROTA PATCH: /profiles/:id
  @Patch(':id')
  @HttpCode(HttpStatus.OK) // Retorna 200 OK
  @ApiOperation({ summary: 'Atualiza parcialmente um perfil de usuário.' })
  @ApiResponse({
    status: 200,
    description: 'Perfil atualizado com sucesso.',
    type: Profile,
  })
  @ApiResponse({ status: 404, description: 'Perfil não encontrado.' })
  @ApiResponse({ status: 409, description: 'E-mail ou Username já em uso.' })
  async update(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    return this.profilesService.update(parseInt(id, 10), updateProfileDto);
  }

  // ROTA DELETE: /profiles/:id
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // Retorna 204 No Content se a exclusão for bem-sucedida
  @ApiOperation({ summary: 'Remove um perfil de usuário pelo ID.' })
  @ApiResponse({ status: 204, description: 'Perfil removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Perfil não encontrado.' })
  async remove(@Param('id') id: string): Promise<void> {
    // Converte o ID da URL para número e chama o Service
    await this.profilesService.remove(parseInt(id, 10));
  }
}
