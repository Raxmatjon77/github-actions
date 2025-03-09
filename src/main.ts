import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { LoggerInterceptor } from './interceptors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
  });
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description for the project ')
    .setVersion('1.0')
    .addTag('api')
    .build();

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggerInterceptor());

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // const PORT = process.env.PORT;
  console.log('suuui');

  await app.listen(3000);
}

bootstrap();
