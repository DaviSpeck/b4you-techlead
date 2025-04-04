import { Controller, Get, Logger } from '@nestjs/common';
import { HealthService } from './health.service';

@Controller('health')
export class HealthController {
  private readonly logger = new Logger(HealthController.name);

  constructor(private readonly healthService: HealthService) {}

  @Get()
  async check() {
    const dbStatus = await this.healthService.checkDatabase();

    const result = {
      status: dbStatus === 'up' ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      dependencies: {
        database: dbStatus,
      },
    };

    this.logger.log(`Health check result: DB=${dbStatus}`);
    return result;
  }
}