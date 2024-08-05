import { Module } from '@nestjs/common';
import { MainappController } from './mainapp.controller';
import { MainappService } from './mainapp.service';

@Module({
  controllers: [MainappController],
  providers: [MainappService]
})
export class MainappModule {}
