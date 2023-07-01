import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditThisCourseContentComponent } from './edit-this-course-content.component';

describe('EditThisCourseContentComponent', () => {
  let component: EditThisCourseContentComponent;
  let fixture: ComponentFixture<EditThisCourseContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditThisCourseContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditThisCourseContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
