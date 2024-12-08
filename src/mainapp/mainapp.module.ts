import { Module } from '@nestjs/common';
import { MainappController } from './mainapp.controller';
import { MainappService } from './mainapp.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
@Module({
  imports:[PrismaModule,JwtModule.register({})],
  controllers: [MainappController],
  providers: [MainappService]
})
export class MainappModule {}
