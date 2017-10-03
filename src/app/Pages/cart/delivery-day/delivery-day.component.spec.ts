import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryDayComponent } from './delivery-day.component';

describe('DeliveryDayComponent', () => {
  let component: DeliveryDayComponent;
  let fixture: ComponentFixture<DeliveryDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
