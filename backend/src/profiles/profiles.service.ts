// src/profiles/profiles.service.ts

import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { CreateProfileDto } from './dto/create-profile.dto';

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

  // (Aqui você adicionaria os métodos create, update e remove)
}
