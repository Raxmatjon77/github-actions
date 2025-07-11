import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
// import { Tokens } from './types/type.tokens';
import { Body, HttpStatus, HttpCode } from '@nestjs/common';
import { verDto } from './dto/verify.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  @HttpCode(HttpStatus.CREATED)
  signUp(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }
  @Post('/verify')
  @HttpCode(HttpStatus.OK)
  verify(@Body() dto: verDto) {
    console.log('verify');

    return this.authService.verify(dto);
  }
}
