import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportPayment } from './report-payment';

describe('ReportPayment', () => {
  let component: ReportPayment;
  let fixture: ComponentFixture<ReportPayment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportPayment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportPayment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
