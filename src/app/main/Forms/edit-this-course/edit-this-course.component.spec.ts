import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditThisCourseComponent } from './edit-this-course.component';

describe('EditThisCourseComponent', () => {
  let component: EditThisCourseComponent;
  let fixture: ComponentFixture<EditThisCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditThisCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditThisCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
