import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/_services/courses.service';
import { Course } from '../../_models/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  constructor(private courseService: CoursesService) {}

  p: number = 1;

  Arr!: Course[];
  url="http://localhost:8000/uploads/courses/"

  ngOnInit(): void {
    this.getAllcourses();
  }

  getAllcourses() {
    this.courseService.getAllCourses().subscribe(
      (res) => {
        this.Arr = res;
        // console.log(this.Arr);
      },
      (err) => {
        console.log('cant load data');
        console.log(err);
      }
    );
  }
 
  
 
 

  deleteCourse(id:number){
    this.courseService.deleteCourseById(id).subscribe(
      (res) => {
        this.ngOnInit();
     
      },


    //  () => this.getAllcourses(),
      (err) => {
        console.log('Error deleting course');
        console.log(err);
      }
    );
  }
}
