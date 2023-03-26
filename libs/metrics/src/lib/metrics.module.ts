import { Module, DynamicModule, Global } from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { METRICS_MODULE_OPTIONS } from './models/metrics.constants';
import { MetricsModuleOptions } from './models/metrics.interface';

@Global()
@Module({})
export class MetricsModule {
  static forRoot(options: MetricsModuleOptions): DynamicModule {
    return {
      module: MetricsModule,
      providers: [
        {
          provide: METRICS_MODULE_OPTIONS,
          useValue: options,
        },
        MetricsService,
      ],
      exports: [MetricsService],
    };
  }
}
