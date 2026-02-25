import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferReport } from './transfer-report';

describe('TransferReport', () => {
  let component: TransferReport;
  let fixture: ComponentFixture<TransferReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransferReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
