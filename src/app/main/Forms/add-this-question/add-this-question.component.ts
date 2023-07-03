import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Exam } from "src/app/_models/exam.model";
import { Question } from "src/app/_models/question.model";
import { ExamsService } from "src/app/_services/exams.service";
import { QuestionService } from "src/app/_services/question.service";

@Component({
  selector: "app-add-this-question",
  templateUrl: "./add-this-question.component.html",
  styleUrls: ["./add-this-question.component.css"],
})
export class AddThisQuestionComponent implements OnInit {
  exam!: Exam[];
  exam_id: number = 0;
  data: any = {
    header: "",
    choices: [],
    score: 0,
    exam_id: 0,
  };

  constructor(
    private questionService: QuestionService,
    private router: Router,
    private examService: ExamsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.exam_id = params["examId"];
    });
    this.getAllExam();
  }

  getAllExam() {
    this.examService.getAllExams().subscribe(
      (res) => {
        this.exam = res.data;
      },
      (err) => {
        console.log("Error getting all exam");
        console.log(err);
      }
    );
  }

  addQuestion(form: NgForm) {
    this.data.header = form.value["header"];
    this.data.score = form.value["score"];
    this.data.exam_id = this.exam_id;

    let choices = [
      {
        text: form.value["choice_1"],
        is_correct: form.value["correctAnswer1"],
      },
      {
        text: form.value["choice_2"],
        is_correct: form.value["correctAnswer2"],
      },
      {
        text: form.value["choice_3"],
        is_correct: form.value["correctAnswer3"],
      },
      {
        text: form.value["choice_4"],
        is_correct: form.value["correctAnswer4"],
      },
    ];

    choices = choices.filter((choice) => choice.text !== "");

    this.data.choices = choices;

    const formattedData = {
      header: this.data.header,
      choices: this.data.choices,
      score: this.data.score,
    };
    console.log(choices);

    this.data.choices = choices;

    this.questionService.CreateQestion(formattedData, this.exam_id).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err: any) => {
        console.log("Error adding question");
        console.log(err);
      }
    );

    this.router.navigate([`/main/trainer/exam/${this.exam_id}`]);
  }

  onSubmit(form: NgForm) {
    // console.log(form);
    // console.log(form.value);
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}
