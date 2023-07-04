import { Component, OnInit } from "@angular/core";
import { Course } from "src/app/_models/course.model";
import { CoursesService } from "src/app/_services/courses.service";
import { StudentService } from "src/app/_services/student.service";
import { TrainerService } from "src/app/_services/trainer.service";

@Component({
  selector: "app-my-courses",
  templateUrl: "./my-courses.component.html",
  styleUrls: ["./my-courses.component.css"],
})
export class MyCoursesComponent implements OnInit {
  checkUser!: string;
  id: number = parseInt(localStorage.getItem("id")!);
  courseArray!: Course[];
  courseCount: number[] = [];

  p: number = 1;

  url = "http://localhost:8000/uploads/courses/";
  t_url = "http://localhost:8000/uploads/trainer/";

  constructor(
    private trainserService: TrainerService,
    private studentService: StudentService,
    private courseService: CoursesService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem("role") == "isTrainer") this.checkUser = "trainer";
    else this.checkUser = "student";
    this.getCourses();
    console.log(this.checkUser);
  }

  getCourses() {
    if (this.checkUser == "trainer") {
      this.trainserService.getCoursesOfTrainer(this.id).subscribe(
        (res) => {
          console.log(res);
          this.courseArray = [];
          this.courseArray = res;
          console.log(res.courses);

          for (let i = 0; i < this.courseArray.length; i++) {
            this.getCountOfStudents(i, this.courseArray[i].id!);
          }
        },
        (err) => {
          console.log(err);
        }
      );
      console.log("====================================");
      console.log(this.courseArray);
      console.log("====================================");
    } else {
      this.studentService.getCoursesOfStudent(this.id).subscribe(
        (res) => {
          this.courseArray = [];
          this.courseArray = res;

          for (let i = 0; i < this.courseArray.length; i++) {
            this.getCountOfStudents(i, this.courseArray[i].id!);
          }
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  getCountOfStudents(index: number, id: number) {
    this.courseService.getCountStudentsInCourse(id).subscribe((res) => {
      this.courseCount[index] = res;
    });
  }
}
