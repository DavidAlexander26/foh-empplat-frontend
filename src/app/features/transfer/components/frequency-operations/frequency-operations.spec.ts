import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrequencyOperations } from './frequency-operations';

describe('FrequencyOperations', () => {
  let component: FrequencyOperations;
  let fixture: ComponentFixture<FrequencyOperations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrequencyOperations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrequencyOperations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
