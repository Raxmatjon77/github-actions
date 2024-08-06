import { Controller } from '@nestjs/common';
import { confDto } from './dto/config.dto';
import { Post,Body,HttpCode,HttpStatus } from '@nestjs/common';
import { MainappService } from './mainapp.service';
@Controller('mainapp')
export class MainappController {
  constructor(private app: MainappService) {}

  @Post('/setconf')
  @HttpCode(HttpStatus.OK)
  signUp(@Body() dto: confDto) {
    return this.app.setConfig(dto)
  }
  @Post('/verify')
  @HttpCode(HttpStatus.OK)
  verify(@Body() dto: confDto) {
    // return this.authService.verify(dto);
  }
}
