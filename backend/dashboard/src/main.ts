// main.ts (NestJS)
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuration du CORS pour la production et le local
  app.enableCors({
    origin: (origin, callback) => {
      // Si la requête vient de localhost ou d'un domaine qui contient '.vercel.app'
      if (
        !origin ||
        origin.startsWith('http://localhost') ||
        origin.endsWith('.vercel.app')
      ) {
        callback(null, true);
      } else {
        callback(new Error('Bloqué par la sécurité CORS de Mory'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Si aucun n'est fourni (comme sur ton PC), on garde 8080.
  const port = process.env.PORT || 8080;

  await app.listen(port, '0.0.0.0');
}
bootstrap();
