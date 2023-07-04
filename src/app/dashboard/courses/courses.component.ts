import { Component, OnInit } from "@angular/core";
import { CoursesService } from "src/app/_services/courses.service";
import { Course } from "../../_models/course.model";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.css"],
})
export class CoursesComponent implements OnInit {
  constructor(
    private courseService: CoursesService,
    private toastr: ToastrService
  ) {}

  p: number = 1;

  Arr!: Course[];
  url = "http://localhost:8000/uploads/courses/";

  ngOnInit(): void {
    this.getAllcourses();
  }

  getAllcourses() {
    this.courseService.getAllCourses().subscribe(
      (res) => {
        this.Arr = res;
        console.log(this.Arr);
      },
      (err) => {
        console.log("cant load data");
        console.log(err);
      }
    );
  }

  deleteCourse(id: number) {
    this.courseService.deleteCourseById(id).subscribe(
      (res) => {
        this.toastr.success("Course Deleted successfully!", "Success");

        this.ngOnInit();
      },

      //  () => this.getAllcourses(),
      (err: HttpErrorResponse) => {
        if (err.error && err.error.error) {
          const errors = err.error.error;
          const errorFields = Object.keys(errors);
          errorFields.forEach((field) => {
            const errorMessages = errors[field].join(". ");
            this.toastr.error(`${field}: ${errorMessages}`, "Error");
          });
        } else {
          this.toastr.error("Something went wrong", "Error");
        }
      }
    );
  }
}
