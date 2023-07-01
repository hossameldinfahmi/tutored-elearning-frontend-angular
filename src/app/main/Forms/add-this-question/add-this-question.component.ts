import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Exam } from 'src/app/_models/exam.model';
import { Question } from 'src/app/_models/question.model';
import { ExamsService } from 'src/app/_services/exams.service';
import { QuestionService } from 'src/app/_services/question.service';

@Component({
  selector: 'app-add-this-question',
  templateUrl: './add-this-question.component.html',
  styleUrls: ['./add-this-question.component.css']
})
export class AddThisQuestionComponent implements OnInit {

  exam!: Exam[];
  exam_id:number=0;
  data: Question={
    header: '',
    choice_1: '',
    choice_2: '' ,
    choice_3: '' ,
    choice_4: '' ,
    answer: '' ,
    score:0,
    exam_id:0,
};

  constructor(private QuestionService: QuestionService ,private router: Router ,private Examservices:ExamsService ,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params) => {
      this.exam_id=params['examId'];
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
        console.log('Error getting all exam');
        console.log(err);
      }
    );
  }
  addQuestion(form: NgForm) {

    this.data.header = form.value['header'];
    this.data.choice_1 = form.value['choice_1'];
    this.data.choice_2 = form.value['choice_2'];
    this.data.choice_3 = form.value['choice_3'];
    this.data.choice_4 = form.value['choice_4'];
    this.data.answer = form.value['answer'];
    this.data.score = form.value['score'];
    // this.data.exam_id = form.value['exam_id'];
    this.data.exam_id = this.exam_id;
    // console.log(form.value);
    // console.log(this.exam_id);


    this.QuestionService.CreateQestion(this.data).subscribe(
      (res) => {
        // console.log(res);
        // console.log(res.data);
        // console.log(form.value.exam_id);

      },
      (err) => {
        console.log('Error adding question');
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
