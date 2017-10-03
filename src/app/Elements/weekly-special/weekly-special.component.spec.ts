import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklySpecialComponent } from './weekly-special.component';

describe('WeeklySpecialComponent', () => {
  let component: WeeklySpecialComponent;
  let fixture: ComponentFixture<WeeklySpecialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklySpecialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklySpecialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
