import { IsNotEmpty, IsNumber, IsString, Length, Min, min, MinLength } from 'class-validator';

export class verDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @IsNotEmpty()
  @IsString()
  @Length(6)
  code: string;
}
