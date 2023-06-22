import { Component, OnInit } from "@angular/core";

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

  constructor() {}

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

  getCategoriesCount() {}

  getCoursesCount() {}

  getStudentsCount() {}

  getTrainersCount() {}
}
