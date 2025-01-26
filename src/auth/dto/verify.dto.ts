import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class verDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  @Length(6)
  code: string;
}
