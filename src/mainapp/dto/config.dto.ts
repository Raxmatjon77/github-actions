import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Timestamp } from 'rxjs';

export class confDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
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
