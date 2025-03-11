import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerInterceptor } from './interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.useLogger(['log', 'error', 'warn', 'debug', 'verbose']);

  app.useGlobalInterceptors(new LoggerInterceptor());

  // const PORT = process.env.PORT;
  console.log('suuui');

  await app.listen(3000);
}

bootstrap();
