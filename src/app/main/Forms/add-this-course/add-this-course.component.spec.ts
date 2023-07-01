import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddThisCourseComponent } from './add-this-course.component';

describe('AddThisCourseComponent', () => {
  let component: AddThisCourseComponent;
  let fixture: ComponentFixture<AddThisCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddThisCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddThisCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
