import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Route } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import {
  ExamResultService,
  result,
} from "src/app/_services/exam-result.service";
import {
  ExamQuestion,
  QuestionService,
} from "src/app/_services/question.service";

@Component({
  selector: "app-exam-page",
  templateUrl: "./exam-page.component.html",
  styleUrls: ["./exam-page.component.css"],
})
export class ExamPageComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private question: QuestionService,
    private examResult: ExamResultService
  ) {}
  id!: number;
  examQuestion!: any;
  result: result = {
    student_id: 0,
    exam_id: 0,
    degree: 0,
  };

  ex_id = 0;
  total = 0;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params["courseId"];
      // console.log(params);
    });
    this.getAllexamQuestions();
  }

  getAllexamQuestions() {
    this.question.getexamQuestions(this.id).subscribe(
      (res) => {
        this.examQuestion = res.data;
        // console.log(this.examQuestion);
        localStorage.setItem("exam_id", this.examQuestion[0].exam_id);
      },
      (err) => {
        console.log("cant load data from exam question");
        console.log(err);
      }
    );
  }

  addAnswers(form: NgForm) {
    // console.log(form);

    for (var i = 0; i < this.examQuestion.length; i++) {
      if (this.examQuestion[i].answer === Object.values(form.value)[i]) {
        this.total += this.examQuestion[i].score;
      }
    }

    this.result.student_id = parseInt(localStorage.getItem("id")!);
    this.result.degree = this.total;
    this.result.exam_id = this.examQuestion[0].exam_id;

    // console.log(this.result);
    this.examResult.addResult(this.result).subscribe(
      (res) => {
        // console.log(res);
      },
      (err) => {
        console.log("Error adding course content");
        console.log(err);
      }
    );
  }
}
