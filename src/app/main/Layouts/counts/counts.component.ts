import { Component, OnInit } from "@angular/core";
import { CategororyService } from "src/app/_services/categorory.service";
import { CoursesService } from "src/app/_services/courses.service";
import { StudentService } from "src/app/_services/student.service";
import { TrainerService } from "src/app/_services/trainer.service";

@Component({
  selector: "app-counts",
  templateUrl: "./counts.component.html",
  styleUrls: ["./counts.component.css"],
})
export class CountsComponent implements OnInit {
  categoryCount: number = 0;
  courseCount: number = 0;
  studentCount: number = 0;
  trainerCount: number = 0;

  constructor(
    private categoryService: CategororyService,
    private courseService: CoursesService,
    private studentService: StudentService,
    private trainerService: TrainerService
  ) {}

  ngOnInit(): void {
    this.getCategoriesCount();
    this.getCoursesCount();
    this.getStudentsCount();
    this.getTrainersCount();
  }

  //this is a variable that hold number
  studentsCounter: number = 0;
  coursesCounter: number = 0;
  categoriesCounter: number = 0;
  trainersCounter: number = 0;

  projectcountstop1!: any;
  projectcountstop2!: any;
  projectcountstop3!: any;
  projectcountstop4!: any;

  getCategoriesCount() {
    this.categoryService.getCategoriesCount().subscribe(
      (res) => {
        this.categoryCount = res;
        // console.log(res);
        // this.projectcountstop3 = setInterval(() => {
        //   this.categoriesCounter++;
        //   if (this.categoriesCounter == this.categoryCount) {
        //     clearInterval(this.projectcountstop3);
        //   }
        // }, 8);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getCoursesCount() {
    this.courseService.getCoursesCount().subscribe(
      (res) => {
        this.courseCount = res;
        // this.projectcountstop2 = setInterval(() => {
        //   this.coursesCounter++;
        //   if (this.coursesCounter == this.courseCount) {
        //     clearInterval(this.projectcountstop2);
        //   }
        // }, 8);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getStudentsCount() {
    this.studentService.getStudentsCount().subscribe(
      (res) => {
        this.studentCount = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getTrainersCount() {
    this.trainerService.getTrainersCount().subscribe(
      (res) => {
        this.trainerCount = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
