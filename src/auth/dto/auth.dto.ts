import { IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  phoneNumber: string;
  code: string;
  // @IsNotEmpty()
  // @IsString()
  // firstName: string;
  // @IsNotEmpty()
  // @IsString()
  // lastName: string;
  // @IsNotEmpty()
  // birthDate: string;
  // @IsNotEmpty()
  // @IsString()
  // NamazStartes: string;
  // @IsNotEmpty()
  // @IsString()
  // firstTime: string;
}

// {
//     "to":"+998932301904",
//     "message":"nima gap"
// }
