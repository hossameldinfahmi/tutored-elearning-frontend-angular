import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainersmainComponentComponent } from './trainersmain-component.component';

describe('TrainersmainComponentComponent', () => {
  let component: TrainersmainComponentComponent;
  let fixture: ComponentFixture<TrainersmainComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainersmainComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainersmainComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
