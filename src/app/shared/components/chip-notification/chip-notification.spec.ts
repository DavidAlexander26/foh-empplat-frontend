import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipNotification } from './chip-notification';

describe('ChipNotification', () => {
  let component: ChipNotification;
  let fixture: ComponentFixture<ChipNotification>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipNotification]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChipNotification);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
