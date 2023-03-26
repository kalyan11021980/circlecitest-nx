import { Controller, Get, Res } from '@nestjs/common';
import { MetricsService } from '@nxtest/metrics';
import { AppService } from './app.service';
import {Response} from 'express'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly metricsService: MetricsService) {}

  @Get('metrics')
  getMetrics(@Res({ passthrough: true }) res: Response) {
    res.set('Content-Type', this.metricsService.getRegister().contentType);
    return this.metricsService.getRegister().metrics();
  }

  @Get('test')
  getData() {
    return this.appService.getData();
  }
}
