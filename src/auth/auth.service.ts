import { BadRequestException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { IsPhoneNumber } from 'class-validator';
import { verify } from 'crypto';
import axios from 'axios';
import { Tokens } from './types/type.tokens';
import { JwtService } from '@nestjs/jwt';
import { verDto } from './dto/verify.dto';
import * as bcrypt from 'bcryptjs';
import { access } from 'fs';
import { response } from 'express';
import { error } from 'console';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async signin(dto: AuthDto) {
    let existUser = await this.prisma.user.findUnique({
      where: {
        phoneNumber: dto.phoneNumber,
      },
    });

    const code = generateOTP();
    if (existUser) {
      const otp = await this.prisma.otp.create({
        data: {
          otp: code,
          user_id: existUser.id,
        },
      });
      await axios
        .post(
          process.env.SMS_URL,
          {
            to: existUser.phoneNumber,
            message: `sizning otp kodingiz: ${code} `,
          },
          {
            headers: {
              Authorization: `${process.env.SMS_SECRET_TOKEN}`,
            },
          },
        )
        .then((res) => console.log(res?.data?.responses[0]))
        .catch((e) => {
          console.log(e);
        });
      return {
        id: existUser.id,
        code,
        message: 'signin',
      };
    } else if (!existUser) {
      const newUser = await this.prisma.user.create({
        data: {
          phoneNumber: dto.phoneNumber,
        },
      });
      const otp = await this.prisma.otp.create({
        data: {
          otp: code,
          user_id: newUser.id,
        },
      });

      await axios
        .post(
          process.env.SMS_URL,
          {
            to: newUser.phoneNumber,
            message: `sizning otp kodingiz: ${code} `,
          },
          {
            headers: {
              Authorization: `${process.env.SMS_SECRET_TOKEN}`,
            },
          },
        )
        .then()
        .catch((e) => {
            console.log(e);
          throw new NotFoundException(e?.messae);
        
        });
      console.log(newUser.phoneNumber);
      return {
        id: newUser.id,
        code,
        message: 'signin',
      };
    }
    console.log(existUser);

    return new InternalServerErrorException('Internal server error');
  }

  async verify(dto: verDto,) {
//         console.log(dto);
        
       let userVerify = await this.prisma.otp.findMany({
        where: {
          user_id: dto.id,
        },
      })
      
        let user = await this.prisma.user.findUnique({
          where: {
            id: dto.id,
          },
        });
   
    // console.log(userVerify[userVerify.length - 1]);
 if (user) {
   throw new NotFoundException('no user found');
 } 
    if (!userVerify) {

      throw new NotFoundException('no');
    } 
    else if (userVerify.length >= 1) {
      if (
        userVerify[userVerify.length - 1].otp == dto.code 
        // calculateTimeDifference(userVerify[userVerify.length - 1].created_at) <=
        //   120
      ) {
        const tokens = await this.getTokens(dto.id, user.phoneNumber);
        await this.updateRtHash(user.id, tokens.refresh_token);
        
          return {
            message: 'success !',
            access: tokens.access_token,
            refresh: tokens.refresh_token,
          };
        
      } else {
        return new BadRequestException('wrong otp code or time is up !');
      }
    }

    return new InternalServerErrorException('');

   
  }

  hashdata(data: string): string {
    const hasheddata = bcrypt.hashSync(data, 10);
    return hasheddata;
  }
  async getTokens(UserId: number, phoneNumber: string): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwt.signAsync(
        {
          sub: UserId,
          phoneNumber,
        },
        {
          expiresIn: 60 * 15,
          secret: process.env.JWT_AT_SECRET,
        },
      ),
      this.jwt.signAsync(
        {
          sub: UserId,
          phoneNumber,
        },
        {
          expiresIn: 60 * 60 * 24 * 7,
          secret: process.env.JWT_RT_SECRET,
        },
      ),
    ]);
    return {
      message: 'success !',
      access_token: at,
      refresh_token: rt,
    };
  }
  async updateRtHash(id: number, rt: string) {
    const updatedRt = this.hashdata(rt);
    await this.prisma.user.update({
      where: { id: id },
      data: {
        hashedRt: updatedRt,
      },
    });
  }
}

function generateOTP():string {
  let otp:string = '';
  const digits = '0123456789';
  for (let i = 0; i < 6; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

const calculateTimeDifference = (eventTime:Date) => {
      return (
        Math.floor(Date.now() / 1000) -
        Math.floor(new Date(eventTime).getTime() / 1000)
      );
    };