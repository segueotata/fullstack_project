// src/profiles/profiles.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // Garanta que esta linha existe
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { Profile } from './entities/profile.entity'; // Garanta que esta linha existe

@Module({
  // A CHAVE ESTÁ AQUI: Importar o repositório da entidade Profile para o módulo
  imports: [TypeOrmModule.forFeature([Profile])],
  controllers: [ProfilesController],
  providers: [ProfilesService],
  // Se outros módulos precisarem usar o ProfilesService, adicione-o aqui:
  // exports: [ProfilesService]
})
export class ProfilesModule {}
