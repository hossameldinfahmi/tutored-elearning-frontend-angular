import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Course } from "src/app/_models/course.model";
import { Exam } from "src/app/_models/exam.model";
import { CoursesService } from "src/app/_services/courses.service";
import { ExamsService } from "src/app/_services/exams.service";

@Component({
  selector: "app-update-exam",
  templateUrl: "./update-exam.component.html",
  styleUrls: ["./update-exam.component.css"],
})
export class UpdateExamComponent implements OnInit {
  ExamArray!: Exam[];
  courese!: Course[];

  examContent: Exam = {
    course_id: 0,
    max_score: 0,
    title: "",
  };

  updatedExam: Exam = {
    course_id: 0,
    max_score: 0,
    title: "",
  };

  constructor(
    private examService: ExamsService,
    private activatedRoute: ActivatedRoute,
    private CourseServices: CoursesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params["id"];
      // console.log(params);
      if (id) {
        this.getExams(id);
        console.log(this.examContent);
      }
    });
    this.getAllExams();

    this.getAllCourses();
  }

  getAllCourses() {
    this.CourseServices.getAllCourses().subscribe(
      (res) => {
        this.courese = res;
      },
      (err) => {
        console.log("Error getting all courses");
        console.log(err);
      }
    );
  }

  getAllExams() {
    this.examService.getAllExams().subscribe(
      (res) => {
        this.ExamArray = res.data;
        // console.log(res);
      },
      (err) => {
        console.log("Error getting exams");
        console.log(err);
      }
    );
  }

  getExams(id: number) {
    this.examService.getexam(id).subscribe(
      (res) => {
        this.examContent = res.data;
        // console.log(res);
      },
      (err) => {
        console.log("Error getting exam");
        console.log(err);
      }
    );
  }

  updateExam(id: number, form: NgForm) {
    this.updatedExam.title = form.value["examName"];
    this.updatedExam.course_id = form.value["course_id"];
    this.updatedExam.max_score = form.value["max_score"];
    // console.log(this.updatedExam);
    this.examService.editExam(id, this.updatedExam).subscribe(
      (res) => {
        // this.coursesContentsArr = res;
        // console.log(res);
        this.toastr.success("Exam Updated successfully!", "Success");

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

  resetForm(form: NgForm) {
    form.reset();
  }
}
