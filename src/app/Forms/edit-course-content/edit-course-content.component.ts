import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/_models/course.model';
import { CourseContent } from 'src/app/_models/course_content.model';
import { CourseContentService } from 'src/app/_services/course-content.service';
import { CoursesService } from 'src/app/_services/courses.service';

@Component({
  selector: 'app-edit-course-content',
  templateUrl: './edit-course-content.component.html',
  styleUrls: ['./edit-course-content.component.css'],
})
export class EditCourseContentComponent implements OnInit {


  CourseArray!:Course[];



  courseContent: CourseContent = {
    course_id: 0,
    content: '',
    name: '',
  };

  updatedContent: CourseContent = {
    course_id: 0,
    content: '',
    name: '',
  };

  constructor(
    private CourseContentService: CourseContentService,
    private activatedRoute: ActivatedRoute,
    private courseService: CoursesService
    ,private router:Router
  ) {}
courseid!:number;
coursename!:string;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      this.courseid = params['courseId'];
      this.coursename = params['courseName'];

      // console.log(params);
      if (id) {
        this.getCourseContent(id);
        // console.log(this.courseContent);
      }
    });
    this.getAllCourses();
  }

  getAllCourses() {
    this.courseService.getAllCourses().subscribe(
      (res) => {
        this.CourseArray = res;
        // console.log(this.CourseArray);
      },
      (err) => {
        console.log('cant load data');
        console.log(err);
      }
    );
  }

  getCourseContent(id: number) {
    this.CourseContentService.getCourseContent(id).subscribe(
      (res) => {
        this.courseContent = res;
        // console.log(res);
      },
      (err) => {
        console.log('Error getting course content');
        console.log(err);
      }
    );
  }

  updateCourseContent(id: number,form:NgForm) {
    this.updatedContent.name = form.value['contentName'];
    this.updatedContent.content = form.value['courseContent'];
    this.updatedContent.course_id = this.courseid
    console.log(this.updatedContent);
    this.CourseContentService.editCourseContent(id,this.updatedContent).subscribe(
      (res) => {
        // console.log(res);
        // this.ngOnInit();
        this.router.navigate([`/dashboard/contents/${this.courseid}/${this.coursename}`]);
      },
      (err) => {
        console.log('Error updating course content');
        console.log(err);
      }
    );
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}
