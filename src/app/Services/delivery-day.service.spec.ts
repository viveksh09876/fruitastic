import { TestBed, inject } from '@angular/core/testing';

import { DeliveryDayService } from './delivery-day.service';

describe('DeliveryDayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeliveryDayService]
    });
  });

  it('should be created', inject([DeliveryDayService], (service: DeliveryDayService) => {
    expect(service).toBeTruthy();
  }));
});
