import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityModal } from './security-modal';

describe('SecurityModal', () => {
  let component: SecurityModal;
  let fixture: ComponentFixture<SecurityModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SecurityModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SecurityModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
