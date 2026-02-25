import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSalary } from './delete-salary';

describe('DeleteSalary', () => {
  let component: DeleteSalary;
  let fixture: ComponentFixture<DeleteSalary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteSalary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSalary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
