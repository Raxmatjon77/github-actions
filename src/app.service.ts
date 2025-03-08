import { Injectable } from '@nestjs/common';


@Injectable()
export class AppService {
  getHello(): string {
   console.log('test 123');
   
    return 'Hello World!';
  }
}
