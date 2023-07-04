import { Component, OnInit } from "@angular/core";
import { Course } from "src/app/_models/course.model";
import { CourseStudent } from "src/app/_models/course_student.model";
import { CoursesService } from "src/app/_services/courses.service";

@Component({
  selector: "app-cources",
  templateUrl: "./cources.component.html",
  styleUrls: ["./cources.component.css"],
})
export class CourcesComponent implements OnInit {
  url = "http://localhost:8000/uploads/courses/";
  t_url = "http://localhost:8000/uploads/trainer/";

  courseArray!: Course[];
  courseCount: number[] = [];
  constructor(private courseService: CoursesService) {}
  p: number = 1;

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.courseService.getAllCourses().subscribe(
      (res) => {
        this.courseArray = res;
        // console.log(this.courseArray);

        // for (let i = 0; i < this.courseArray.length; i++) {
        //   this.getCountOfStudents(i, this.courseArray[i].id!);
        // }
      },
      (err) => {
        console.log(err);
      },
      () => {}
    );
  }

  getCountOfStudents(index: number, id: number) {
    this.courseService.getCountStudentsInCourse(id).subscribe((res) => {
      this.courseCount[index] = res;
    });
  }
}
