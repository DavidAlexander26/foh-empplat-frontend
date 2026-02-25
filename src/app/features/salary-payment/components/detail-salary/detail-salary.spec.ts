import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSalary } from './detail-salary';

describe('DetailSalary', () => {
  let component: DetailSalary;
  let fixture: ComponentFixture<DetailSalary>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailSalary]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailSalary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
