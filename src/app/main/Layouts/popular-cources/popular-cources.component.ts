import { Component, OnInit } from "@angular/core";
import { Course } from "src/app/_models/course.model";
import { Trainer } from "src/app/_models/trainer.model";
import { CoursesService } from "src/app/_services/courses.service";
import { TrainerService } from "src/app/_services/trainer.service";

@Component({
  selector: "app-popular-cources",
  templateUrl: "./popular-cources.component.html",
  styleUrls: ["./popular-cources.component.css"],
})
export class PopularCourcesComponent implements OnInit {
  coursesArr!: Course[];
  // trainersArr!: Trainer[];
  courseCount: number[] = [];
  start: number = 0;
  c_url = "http://localhost:8000/uploads/courses/";
  t_url = "http://localhost:8000/uploads/trainer/";

  constructor(private courseService: CoursesService) {}
  url = "http://localhost:8000/uploads/courses/";

  courseArray!: Course[];
  Array!: Course[];

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.courseService.getAllCourses().subscribe(
      (res) => {
        this.courseArray = res;

        this.Array = this.courseArray.slice(0, 3);
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

  // getCountOfStudents(index: number, id: number) {
  //   this.courseService.getCountStudentsInCourse(id).subscribe((res) => {
  //     this.courseCount[index] = res;
  //   });
  // }
}
