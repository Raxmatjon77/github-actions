import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
  import { ValidationPipe } from '@nestjs/common';
config()
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  const PORT=process.env.PORT
  await app.listen(PORT,()=>{
    console.log(`server started on port  ${PORT}`);
    
  });
}
bootstrap();
