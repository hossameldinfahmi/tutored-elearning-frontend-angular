import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddThisExamComponent } from './add-this-exam.component';

describe('AddThisExamComponent', () => {
  let component: AddThisExamComponent;
  let fixture: ComponentFixture<AddThisExamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddThisExamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddThisExamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
