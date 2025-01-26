import { Controller } from '@nestjs/common';
import { confDto } from './dto/config.dto';
import { Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { MainappService } from './mainapp.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
@ApiTags('mainapp')
@Controller('mainapp')
export class MainappController {
  constructor(private app: MainappService) {}
  @ApiOperation({ summary: 'main app operation' })
  @ApiBody({
    schema: {
      example: {
        id: 'id',
        firstName: 'name',
        lastName: 'hamidov',
        birthDate: '2024-07-05T15:14:14.539Z',
        NamazStartes: '2024-07-05T15:14:14.539Z',
        firstTime: '2024-07-05T15:14:14.539Z',
      },
    },
  })
  @Post('/setconf')
  @HttpCode(HttpStatus.OK)
  signUp(@Body() dto: confDto) {
    return this.app.setConfig(dto);
  }

  @ApiOperation({ summary: 'change prayer settings' })
  @ApiBody({
    schema: {
      example: {
        id: 'id',
        firstName: 'name',
        lastName: 'hamidov',
        birthDate: '2024-07-05T15:14:14.539Z',
        NamazStartes: '2024-07-05T15:14:14.539Z',
        firstTime: '2024-07-05T15:14:14.539Z',
      },
    },
  })
  @Post('/setconf')
  @HttpCode(HttpStatus.OK)
  changeconf(@Body() dto: confDto) {
    return this.app.setConfig(dto);
  }
  @Post('/verify')
  @HttpCode(HttpStatus.OK)
  verify(@Body() dto: confDto) {
    // return this.authService.verify(dto);
    console.log(dto);
  }
}
