import {Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { MetricsService } from './metrics.service';
import * as client from 'prom-client';

@Injectable()
export class MetricsMiddleware implements NestMiddleware {
    private readonly httpRequestDurationMicroseconds : client.Histogram<string>;

    constructor(private readonly metricsService: MetricsService) {
        this.httpRequestDurationMicroseconds = new client.Histogram({
            name: 'http_request_duration_seconds',
            help: 'Duration of HTTP requests in ms',
            labelNames: ['method', 'route', 'code'],
            buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500],
        });

    }

    use(req: Request, res: Response, next: () => void) {
        if(req.url === '/metrics') {
            return next();
        }
        const route = req.route?.path || 'unknown routes';
        const method = req.method;
        const end = this.httpRequestDurationMicroseconds.startTimer();

        res.on('finish', () => {
            const code = res.statusCode;
            end({ method, route, code });
        });
        next();
    }
}