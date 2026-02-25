import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSalary } from './new-salary';

describe('NewSalary', () => {
  let component: NewSalary;
  let fixture: ComponentFixture<NewSalary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSalary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSalary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
