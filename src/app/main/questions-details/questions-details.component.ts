import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Exam } from "src/app/_models/exam.model";
import { Question } from "src/app/_models/question.model";
import {
  ExamQuestion,
  QuestionService,
} from "src/app/_services/question.service";

@Component({
  selector: "app-questions-details",
  templateUrl: "./questions-details.component.html",
  styleUrls: ["./questions-details.component.css"],
})
export class QuestionsDetailsComponent implements OnInit {
  constructor(
    private QuestionService: QuestionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  QuetionArray!: any[];
  Quetion!: any;
  p: number = 1;
  QuetionExam!: any;

  id: number = 0;
  ngOnInit(): void {
    this.getAll();

    this.activatedRoute.params.subscribe((params) => {
      this.id = params["examId"];
      if (this.id) {
        this.getAllQuestionExam(this.id);
      }
    });
  }
  getAll() {
    this.QuestionService.getAllQuestion().subscribe(
      (res) => {
        this.QuetionArray = res.data;
        console.log(res);
      },
      (err) => {
        console.log(err);
      },
      () => {}
    );
  }

  getone(id: number) {
    this.QuestionService.getoneQestion(id).subscribe(
      (res) => {
        this.Quetion = res.data;
        // console.log(res);
      },
      (err) => {
        console.log(err);
      },
      () => {}
    );
  }

  getAllQuestionExam(id: number) {
    this.QuestionService.getAllQuestionExam(id).subscribe(
      (res) => {
        this.QuetionExam = res;
        console.log(this.QuetionExam.questions);
      },
      (err) => {
        console.log(err);
      },
      () => {}
    );
  }

  deleteQestion(id: number) {
    this.QuestionService.deleteQestion(id).subscribe(
      (res) => {
        // console.log(res.data);
        this.ngOnInit();
        this.toastr.success("Question Deleted successfully!", "Success");
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
