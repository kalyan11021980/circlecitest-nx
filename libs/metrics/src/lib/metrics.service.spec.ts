import { Test } from '@nestjs/testing';
import { MetricsService } from './metrics.service';

describe('MetricsService', () => {
  let service: MetricsService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [MetricsService],
    }).compile();

    service = module.get(MetricsService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
