import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountStatusReport } from './account-status-report';

describe('AccountStatusReport', () => {
  let component: AccountStatusReport;
  let fixture: ComponentFixture<AccountStatusReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountStatusReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountStatusReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
