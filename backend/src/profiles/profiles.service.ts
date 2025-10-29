// src/profiles/profiles.service.ts

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private profilesRepository: Repository<Profile>,
  ) {}

  async create(createProfileDto: CreateProfileDto): Promise<Profile> {
    try {
      // 1. Cria uma instância da entidade (sem tocar o banco ainda)
      const newProfile = this.profilesRepository.create(createProfileDto);

      // 2. Salva no banco (INSERT)
      return await this.profilesRepository.save(newProfile);
    } catch (error) {
      // 3. TRATAMENTO DE ERRO: Captura a violação de restrição UNIQUE do PostgreSQL
      if (error.code === '23505') {
        throw new ConflictException(
          'O Username ou E-mail fornecido já está em uso.',
        );
      }
      // Re-lança outros erros
      throw error;
    }
  }

  // Busca TUDO na tabela 'profiles'
  findAll(): Promise<Profile[]> {
    return this.profilesRepository.find();
  }

  // Busca UM perfil pelo ID
  findOne(id: number): Promise<Profile | null> {
    return this.profilesRepository.findOneBy({ id });
  }

  // Exemplo de como você faria uma pesquisa personalizada
  findByUsername(username: string): Promise<Profile | null> {
    return this.profilesRepository.findOneBy({ username });
  }

  async update(
    id: number,
    updateProfileDto: UpdateProfileDto,
  ): Promise<Profile> {
    // 1. Busca o perfil existente (ou NotFoundException será lançado)
    const profile = await this.profilesRepository.findOneBy({ id });

    if (!profile) {
      throw new NotFoundException(
        `Perfil com ID ${id} não encontrado para atualização.`,
      );
    }

    try {
      // 2. Mescla os dados existentes com os novos dados do DTO
      // O Object.assign ou o .merge() do TypeORM é ideal para PATCH/UPDATE
      this.profilesRepository.merge(profile, updateProfileDto);

      // 3. Salva a entidade atualizada (TypeORM entende que deve ser um UPDATE)
      return await this.profilesRepository.save(profile);
    } catch (error) {
      // 4. Captura erro de unicidade (se o novo email ou username já existir)
      if (error.code === '23505') {
        throw new ConflictException(
          'O nome de usuário ou e-mail já está em uso por outro perfil.',
        );
      }
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    // Tenta deletar o perfil com o ID fornecido
    const result = await this.profilesRepository.delete(id);

    // Verifica se alguma linha foi afetada. Se não, o perfil não existia.
    if (result.affected === 0) {
      throw new NotFoundException(`Perfil com ID ${id} não encontrado.`);
    }
  }

  // (Aqui você adicionaria os métodos create, update e remove)
}
