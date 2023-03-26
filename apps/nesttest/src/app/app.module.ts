import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MetricsMiddleware, MetricsModule } from '@nxtest/metrics';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MetricsModule.forRoot({
      defaultLabels: { app: 'nesttest' },
      prefix: 'nesttest_',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MetricsMiddleware).forRoutes('*');
  }
}
