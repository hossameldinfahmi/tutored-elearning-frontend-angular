import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddThisCourseContentComponent } from './add-this-course-content.component';

describe('AddThisCourseContentComponent', () => {
  let component: AddThisCourseContentComponent;
  let fixture: ComponentFixture<AddThisCourseContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddThisCourseContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddThisCourseContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
