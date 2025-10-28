import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.enableCors({
  //   origin: 'http://localhost:5173',
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  //   credentials: false, // necessário para cookies
  // });

  // Aplica o ValidationPipe globalmente para TODAS as rotas
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades que não estão no DTO
      forbidNonWhitelisted: true, // Retorna erro se houver propriedades extras
    }),
  );

  // 2. Configuração Básica do Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Perfis') // Título da sua API
    .setDescription(
      'Documentação da API para gerenciamento de perfis de usuário.',
    ) // Descrição
    .setVersion('1.0') // Versão da API
    // (Opcional) Se você usa JWT para autenticação:
    .addBearerAuth()
    .build();

  // 3. Criação do Documento
  const document = SwaggerModule.createDocument(app, config);

  // 4. Setup do Swagger UI
  // A documentação estará acessível em: http://localhost:3000/api
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
