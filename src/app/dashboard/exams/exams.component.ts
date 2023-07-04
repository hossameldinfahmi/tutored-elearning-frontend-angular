import { Component, OnInit } from "@angular/core";

import { Exam } from "../../_models/exam.model";
import { ExamsService } from "../../_services/exams.service";
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-exams",
  templateUrl: "./exams.component.html",
  styleUrls: ["./exams.component.css"],
})
export class ExamsComponent implements OnInit {
  constructor(
    private examService: ExamsService,
    private toastr: ToastrService
  ) {}
  ExamArray!: Exam[];

  ngOnInit(): void {
    this.getAllExams();
  }
  p: number = 1;

  getAllExams() {
    this.examService.getAllExams().subscribe(
      (res) => {
        this.ExamArray = res.data;
        // console.log(this.ExamArray);
      },
      (err) => {
        console.log(err);
      },
      () => {}
    );
  }

  deleteExam(id: number) {
    console.log(id);
    this.examService.deleteExam(id).subscribe(
      (res) => {
        // console.log(res);
        this.ngOnInit();
        this.toastr.success("Exam Deleted successfully!", "Success");
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
