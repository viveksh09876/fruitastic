import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LegelNoticeComponent } from './legel-notice.component';

describe('LegelNoticeComponent', () => {
  let component: LegelNoticeComponent;
  let fixture: ComponentFixture<LegelNoticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LegelNoticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegelNoticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
