import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Course } from "src/app/_models/course.model";
import { CoursesService } from "src/app/_services/courses.service";
import { Exam } from "../../_models/exam.model";
import { ExamsService } from "../../_services/exams.service";
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-course-exam-details",
  templateUrl: "./course-exam-details.component.html",
  styleUrls: ["./course-exam-details.component.css"],
})
export class CourseExamDetailsComponent implements OnInit {
  constructor(
    private examService: ExamsService,
    private courseService: CoursesService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ExamArray!: any;
  course!: Course;
  id: number = 0;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params["courseId"];
      // console.log(params);
    });
    this.getCourseById(this.id);
    this.getAllExamsOfCourse(this.id);
  }

  p: number = 1;

  getCourseById(id: number) {
    this.courseService.getCourseById(id).subscribe(
      (res) => {
        // console.log(res);
        this.course = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllExamsOfCourse(id: number) {
    this.examService.getExamsOfCourse(id).subscribe(
      (res) => {
        this.ExamArray = res.exams;

        console.log(this.ExamArray);

        // Access the exams property directly
        // console.log(this.ExamArray);
      },
      (err) => {
        console.log(err);
      },
      () => {}
    );
  }

  deleteExam(id: number) {
    // console.log(id);
    this.examService.deleteExam(id).subscribe(
      (res) => {
        // this.coursesContentsArr = res;
        // console.log(res);
        this.toastr.success("Exam Deleted successfully!", "Success");

        this.ngOnInit();
      },
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
