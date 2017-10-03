import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurePaymentComponent } from './secure-payment.component';

describe('SecurePaymentComponent', () => {
  let component: SecurePaymentComponent;
  let fixture: ComponentFixture<SecurePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
