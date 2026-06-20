// main.ts (NestJS)
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration du CORS pour la production et le local
  app.enableCors({
    origin: [
      'http://localhost:3000',
      process.env.FRONTEND_URL, // C'est ici qu'on mettra l'URL Vercel de ton front
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Si aucun n'est fourni (comme sur ton PC), on garde 8080.
  const port = process.env.PORT || 8080;

  await app.listen(port, '0.0.0.0');
}
bootstrap();
