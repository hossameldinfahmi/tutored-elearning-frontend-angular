import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseExamDetailsComponent } from './course-exam-details.component';

describe('CourseExamDetailsComponent', () => {
  let component: CourseExamDetailsComponent;
  let fixture: ComponentFixture<CourseExamDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseExamDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseExamDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
