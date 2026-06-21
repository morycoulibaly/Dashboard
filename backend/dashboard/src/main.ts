// main.ts (NestJS)
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration du CORS pour la production et le local
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // URL de Vercel en prod, localhost en dev
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Si aucun n'est fourni (comme sur ton PC), on garde 8080.
  const port = process.env.PORT || 8080;

  await app.listen(port, '0.0.0.0');
}
bootstrap();
