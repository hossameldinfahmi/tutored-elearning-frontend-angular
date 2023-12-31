import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Exam } from "src/app/_models/exam.model";
import { Question } from "src/app/_models/question.model";
import { ExamsService } from "src/app/_services/exams.service";
import { QuestionService } from "src/app/_services/question.service";

@Component({
  selector: "app-edit-this-question",
  templateUrl: "./edit-this-question.component.html",
  styleUrls: ["./edit-this-question.component.css"],
})
export class EditThisQuestionComponent implements OnInit {
  constructor(
    private QuestionService: QuestionService,
    private activatedRoute: ActivatedRoute,
    private Examservices: ExamsService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  // id!:number;
  // data !:Question [];
  exam!: Exam[];

  exam_id: number = 0;
  q_id: number = 0;

  Question: Question = {
    header: "",
    choice_1: "",
    choice_2: "",
    choice_3: "",
    choice_4: "",
    answer: "",
    score: 0,
  };
  updatedQuestion: Question = {
    header: "",
    choice_1: "",
    choice_2: "",
    choice_3: "",
    choice_4: "",
    answer: "",
    score: 0,
  };

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.q_id = params["questionId"];
      this.exam_id = params["examId"];
      // console.log(params);
      if (this.q_id) {
        this.getQuestion(this.q_id);
        // console.log(this.Question);
      }
    });

    this.getAllExam();
  }

  getQuestion(id: number) {
    this.QuestionService.getoneQestion(id).subscribe(
      (res) => {
        this.Question = res.data;
        // console.log(res.data);
      },
      (err) => {
        console.log("Error adding course content");
        console.log(err);
      }
    );
  }

  getAllExam() {
    this.Examservices.getAllExams().subscribe(
      (res) => {
        this.exam = res.data;
        // console.log(this.exam);
        // console.log(this.exam_id);
      },
      (err) => {
        console.log("Error getting all exam");
        console.log(err);
      }
    );
  }

  updateQuestion(id: number, form: NgForm) {
    this.updatedQuestion.header = form.value["header"];
    this.updatedQuestion.choice_1 = form.value["choice_1"];
    this.updatedQuestion.choice_2 = form.value["choice_2"];
    this.updatedQuestion.choice_3 = form.value["choice_3"];
    this.updatedQuestion.choice_4 = form.value["choice_4"];
    this.updatedQuestion.answer = form.value["answer"];
    this.updatedQuestion.score = form.value["score"];
    this.updatedQuestion.exam_id = this.exam_id;

    this.QuestionService.editQestion(id, this.updatedQuestion).subscribe(
      (res) => {
        // console.log(res);
        this.ngOnInit();
        this.toastr.success("Question updated Successfully!", "Success");
        this.router.navigate([`/main/trainer/exam/${this.exam_id}`]);
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
    this.router.navigate([`/main/trainer/exam/${this.exam_id}`]);
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}
