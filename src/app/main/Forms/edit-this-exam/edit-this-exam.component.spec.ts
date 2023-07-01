import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditThisExamComponent } from './edit-this-exam.component';

describe('EditThisExamComponent', () => {
  let component: EditThisExamComponent;
  let fixture: ComponentFixture<EditThisExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditThisExamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditThisExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
