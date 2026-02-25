import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteFrequentOperation } from './delete-frequent-operation';

describe('DeleteFrequentOperation', () => {
  let component: DeleteFrequentOperation;
  let fixture: ComponentFixture<DeleteFrequentOperation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteFrequentOperation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteFrequentOperation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
