import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Course } from "src/app/_models/course.model";
import {
  CategororyService,
  catCourse,
} from "src/app/_services/categorory.service";
import { CoursesService } from "src/app/_services/courses.service";

@Component({
  selector: "app-category-courses",
  templateUrl: "./category-courses.component.html",
  styleUrls: ["./category-courses.component.css"],
})
export class CategoryCoursesComponent implements OnInit {
  coursesArray!: catCourse[];
  courseCount: number[] = [];

  url = "http://localhost:8000/uploads/courses/";
  t_url = "http://localhost:8000/uploads/trainer/";

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoryService: CategororyService,
    private courseService: CoursesService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params["categoryId"];
      // console.log(params);
      if (id) {
        this.getCoursesOfCategory(id);
        // console.log(this.coursedetails);
      }
    });
  }

  getCoursesOfCategory(id: number) {
    this.categoryService.getCoursesOfCategory(id).subscribe(
      (res) => {
        this.coursesArray = res;
        console.log("====================================");
        console.log(res);
        console.log("====================================");

        // for (let i = 0; i < this.coursesArray.length; i++) {
        //   this.getCountOfStudents(i, this.coursesArray[i].id!);
        // }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // getCountOfStudents(index: number, id: number) {
  //   this.courseService.getCountStudentsInCourse(id).subscribe((res) => {
  //     this.courseCount[index] = res;
  //   });
  // }
}
