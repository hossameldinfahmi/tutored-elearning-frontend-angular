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
  selector: "app-add-question",
  templateUrl: "./add-question.component.html",
  styleUrls: ["./add-question.component.css"],
})
export class AddQuestionComponent implements OnInit {
  exam!: Exam[];
  exam_id: number = 0;
  data: Question = {
    header: "",
    choice_1: "",
    choice_2: "",
    choice_3: "",
    choice_4: "",
    answer: "",
    score: 0,
    exam_id: 0,
  };

  constructor(
    private QuestionService: QuestionService,
    private router: Router,
    private Examservices: ExamsService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.exam_id = params["id"];
      // console.log(params);
    });

    this.getAllExam();
  }

  getAllExam() {
    this.Examservices.getAllExams().subscribe(
      (res) => {
        this.exam = res.data;
        // console.log(this.exam);
      },
      (err) => {
        console.log("Error getting all exam");
        console.log(err);
      }
    );
  }
  addQuestion(form: NgForm) {
    this.data.header = form.value["header"];
    this.data.choice_1 = form.value["choice_1"] || false;
    this.data.choice_2 = form.value["choice_2"] || false;
    this.data.choice_3 = form.value["choice_3"] || false;
    this.data.choice_4 = form.value["choice_4"] || false;
    this.data.answer = form.value["answer"];
    this.data.score = form.value["score"];
    // this.data.exam_id = form.value['exam_id'];
    this.data.exam_id = this.exam_id;
    // console.log(form.value);
    // console.log(this.exam_id);

    this.QuestionService.CreateQestion(this.data, this.exam_id).subscribe(
      (res) => {
        // console.log(res);
        // console.log(res.data);
        // console.log(form.value.exam_id);
        this.toastr.success("Question added successfully!", "Success");
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

    this.router.navigate([`/dashboard/questions/${this.exam_id}`]);
  }

  onSubmit(form: NgForm) {
    // console.log(form);
    // console.log(form.value);
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}
