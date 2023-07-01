import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddThisQuestionComponent } from './add-this-question.component';

describe('AddThisQuestionComponent', () => {
  let component: AddThisQuestionComponent;
  let fixture: ComponentFixture<AddThisQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddThisQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddThisQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
