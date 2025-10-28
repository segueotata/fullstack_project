// src/profiles/entities/profile.entity.ts

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('profiles') // Mapeia para a tabela 'profiles'
export class Profile {
  // Cria a coluna ID auto-incrementável (TypeORM usa PrimaryGeneratedColumn
  // que mapeia para o SERIAL ou IDENTITY no Postgres)
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false }) // Adicione o nullable se 'class' não for obrigatório
  permissions: number;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 255 })
  password_hash: string;

  // TypeORM lida com a data de criação automaticamente se definirmos o tipo correto
  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;
}
