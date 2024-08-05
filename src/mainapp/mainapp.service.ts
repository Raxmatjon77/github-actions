import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { confDto } from './dto/config.dto';
@Injectable()
export class MainappService {
    constructor(private prisma:PrismaService){

    }
    async setConfig(dto:confDto){

    }
}
