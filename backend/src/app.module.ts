// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppController } from './app.controller'; // Pode remover se não for usar
// import { AppService } from './app.service'; // Pode remover se não for usar
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // Mude para o host do seu PostgreSQL
      port: 5432, // Porta padrão
      username: 'admin', // Seu usuário do banco
      password: 'admin', // Sua senha
      database: 'postgres', // O nome do seu banco

      // Automaticamente carrega entidades
      autoLoadEntities: true,

      // Sincroniza o esquema do BD com as entidades (USE APENAS EM DESENVOLVIMENTO!)
      synchronize: true,
    }),
    ProfilesModule,
  ],
  controllers: [], // Manter vazio ou remover
  providers: [], // Manter vazio ou remover
})
export class AppModule {}
