import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsOfSaleComponent } from './terms-of-sale.component';

describe('TermsOfSaleComponent', () => {
  let component: TermsOfSaleComponent;
  let fixture: ComponentFixture<TermsOfSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsOfSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsOfSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
