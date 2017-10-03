import { TestBed, inject } from '@angular/core/testing';

import { CartProductsService } from './cart-products.service';

describe('CartProductsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CartProductsService]
    });
  });

  it('should be created', inject([CartProductsService], (service: CartProductsService) => {
    expect(service).toBeTruthy();
  }));
});
