import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
  import { ValidationPipe } from '@nestjs/common';
  import { LoggerMiddleware } from './common/middlewares/logger';
config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
   app.use(new LoggerMiddleware().use);
  app.useGlobalPipes(new ValidationPipe());
  const PORT=process.env.PORT
  await app.listen(PORT,()=>{
    console.log(`server started on port  ${PORT}`);
    
  });
}
bootstrap();
