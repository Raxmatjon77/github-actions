import { IsNotEmpty, IsString } from 'class-validator';

export class confDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @IsNotEmpty()
  @IsString()
  lastName: string;
  @IsNotEmpty()
  birthDate: Date;
  @IsNotEmpty()
  @IsString()
  NamazStartes: Date;
  @IsNotEmpty()
  @IsString()
  firstTime: Date;
}
