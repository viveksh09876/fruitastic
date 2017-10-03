import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopnowComponent } from './shopnow.component';

describe('ShopnowComponent', () => {
  let component: ShopnowComponent;
  let fixture: ComponentFixture<ShopnowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopnowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopnowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
