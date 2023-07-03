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
  totalDegree = 0;
  exam: any = {}; // define the exam property here

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
        this.examQuestion = res.exams[0].questions;
        console.log("====================================");
        console.log(this.examQuestion);
        console.log("====================================");
        localStorage.setItem("exam_id", this.examQuestion[0].exam_id);

        // set the exam property here
        this.exam = {
          id: this.examQuestion[0].exam_id,
          course_id: this.id,
          questions: this.examQuestion.map((q: any) => {
            return {
              id: q.id,
              header: q.question,
              choices: [
                { text: q.choice1 },
                { text: q.choice2 },
                { text: q.choice3 },
                { text: q.choice4 },
              ],
            };
          }),
        };
      },
      (err) => {
        console.log("cant load data from exam question");
        console.log(err);
      }
    );
  }
  calculateTotalScore() {
    let totalScore = 0;

    this.examQuestion.forEach((question: any) => {
      totalScore += question.score;
    });

    return totalScore;
  }

  addAnswers(form: NgForm) {
    let score = 0;

    for (let i = 0; i < this.examQuestion.length; i++) {
      let selectedAnswer = this.examQuestion[i].choices.find((choice: any) => {
        return choice.text == Object.values(form.value)[i];
      });

      console.log(selectedAnswer);

      if (selectedAnswer.is_correct) {
        score += this.examQuestion[i].score;
      }

      let totalMarks = this.calculateTotalScore();
      let percentage = (score / totalMarks) * 100;

      this.total = percentage;
    }

    this.result.student_id = parseInt(localStorage.getItem("id")!);
    this.result.degree = this.total;
    this.result.exam_id = this.examQuestion[0].exam_id;

    console.log(this.total + "%");

    this.examResult.addResult(this.result, this.exam.course_id).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log("Error adding course content");
        console.log(err);
      }
    );
  }
}
