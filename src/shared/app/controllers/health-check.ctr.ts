import { Controller, Get } from '@nestjs/common';

@Controller('health-check')
export class HealthCheckCtr {
  @Get()
  run() {
    return 'Ok';
  }
}
