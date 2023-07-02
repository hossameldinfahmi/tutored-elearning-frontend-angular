import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseContent } from '../../_models/course_content.model';
import { CourseContentService } from '../../_services/course-content.service';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.css'],
})
export class CourseContentComponent implements OnInit {
  constructor(private CourseContentService: CourseContentService,
    private activatedRoute: ActivatedRoute,
    ) {}
  coursesContentsArr!: CourseContent[];
  p: number = 1;
  id!:number;
  coursename!:string;


  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params) => {
      this.id = params['courseId'];
      this.coursename = params['courseName'];

      // console.log(params);
      if (this.id) {
         this.getCourseContent(this.id);
      }
       
    });
    // this.getAllCoursesContents();
  }

  getAllCoursesContents() {
    this.CourseContentService.getAllContents().subscribe(
      (res) => {
        this.coursesContentsArr = res;
        // console.log(this.coursesContentsArr);
      },
      (err) => {
        console.log('Error getting courses contents');
        console.log(err);
        
      }
    );
  }

  deleteCourseContent(id: number) {
    this.CourseContentService.deleteCourseContent(id).subscribe(
      (res) => {
        // this.coursesContentsArr = res;
        // console.log(res);
        this.ngOnInit();

      },
      (err) => {
        console.log('Error deleting course content');
        console.log(err);
        
      }
    );
  }




  getCourseContent(id: number) {
    this.CourseContentService.getContentofspacificCourse(id).subscribe(
      (res) => {
        this.coursesContentsArr = res;
        console.log(this.coursesContentsArr);

      },
      (err) => {
        console.log('Error showing course content');
        console.log(err);
      }
    );
  }


}
