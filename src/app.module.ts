import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from './prisma/prisma.module';
import { MainappModule } from './mainapp/mainapp.module';

@Module({
  imports: [AuthModule, PrismaModule, MainappModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
