import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementsReport } from './movements-report';

describe('MovementsReport', () => {
  let component: MovementsReport;
  let fixture: ComponentFixture<MovementsReport>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovementsReport]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovementsReport);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
