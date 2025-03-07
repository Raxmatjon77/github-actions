import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { LoggerMiddleware } from './common/middlewares/logger';

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

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(new LoggerMiddleware().use);
  app.useGlobalPipes(new ValidationPipe());
  // const PORT = process.env.PORT;
  console.log('hii');
  
  await app.listen(3000);
}

bootstrap();
