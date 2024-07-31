import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { IsPhoneNumber } from 'class-validator';
import { verify } from 'crypto';
import axios from 'axios';
import { verDto } from './dto/verify.dto';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    // private JWTServise: JwtService,
  ) {}

  async signin(dto: AuthDto) {
    let existUser = await this.prisma.user.findUnique({
      where: {
        phoneNumber: dto.phoneNumber,
      },
    });

    
    const code = generateOTP()
    if(existUser){
    const otp = await this.prisma.otp.create({
      data:{
        otp:code,
        user_id: existUser.id
      }
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
            Authorization:`${process.env.SMS_SECRET_TOKEN}`,
          },
        },
      )
      .then((res)=>console.log(res?.data?.responses[0])
      )
      .catch((e) => {
        console.log(e);
      });
       return {
         id: existUser.id,
         code,
         message: 'signin',
       };
    }

    else if(!existUser){
      const newUser= await this.prisma.user.create({
        data:{
          phoneNumber:dto.phoneNumber
        }
      })
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
            Authorization:`${process.env.SMS_SECRET_TOKEN}`,
          },
        },
      ).then().catch((e)=>{
         throw new NotFoundException(e?.messae)
          console.log(e);
          
        });
        console.log(newUser.phoneNumber);
         return {
          id:newUser.id,
           code,
           message: 'signin',
         };
        
    }
    console.log(existUser);
  
    
    
   return new InternalServerErrorException('Internal server error')
  }

async verify(dto:verDto){
return {
  message:"verify"
}
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