import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return '<h3>This is API for ComeON! 🫶🏻</h3';
  }
}
