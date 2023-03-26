import { Inject, Injectable, OnModuleInit} from '@nestjs/common';
import { METRICS_MODULE_OPTIONS } from './models/metrics.constants';
import { MetricsModuleOptions } from './models/metrics.interface';
import * as client from 'prom-client';

@Injectable()
export class MetricsService implements OnModuleInit {
    constructor(
        @Inject(METRICS_MODULE_OPTIONS) private readonly options: MetricsModuleOptions,
    ){}
    onModuleInit() {
        console.log(this.options);
    }

    private setMetricsConfigurations() {
        client.register.clear();
        if(this.options.defaultLabels) {
            client.register.setDefaultLabels(this.options.defaultLabels);
        }
        
        if(this.options.prefix) {
            client.collectDefaultMetrics({ prefix: this.options.prefix });
        } else {
            client.collectDefaultMetrics();
        }

    }
    getRegister() {
        return client.register;
    }
    
        
}
