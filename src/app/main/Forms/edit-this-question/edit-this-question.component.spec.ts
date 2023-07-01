import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditThisQuestionComponent } from './edit-this-question.component';

describe('EditThisQuestionComponent', () => {
  let component: EditThisQuestionComponent;
  let fixture: ComponentFixture<EditThisQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditThisQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditThisQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
