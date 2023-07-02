import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Exam } from 'src/app/_models/exam.model';
import { Question } from 'src/app/_models/question.model';
import { ExamsService } from 'src/app/_services/exams.service';
import { QuestionService } from 'src/app/_services/question.service';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {




  constructor(private QuestionService: QuestionService,
    private activatedRoute: ActivatedRoute, private Examservices:ExamsService ,
    private router:Router) { }
  // id!:number;
  // data !:Question [];
  exam!: Exam[];

  exam_id:number=0;
  Question:Question = {
    header: "",
    choice_1: '',
    choice_2: '' ,
    choice_3: '' ,
    choice_4: '' ,
    answer: '' ,
    score:0,
  };
  updatedQuestion: Question = {
    header: "",
    choice_1: '',
    choice_2: '' ,
    choice_3: '' ,
    choice_4: '' ,
    answer: '' ,
    score:0,
  };


  ngOnInit(): void {

    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      this.exam_id=params['exam_id'];
      // console.log(params);
      if (id) {
        this.getQuestion(id);
        // console.log(this.Question);
      }

    });

    this.getAllExam();

  }


getQuestion(id: number) {
    this.QuestionService.getoneQestion(id).subscribe(
      (res) => {
        this.Question=res.data ;
        // console.log(res.data);
      },
      (err) => {
        console.log('Error adding course content');
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
        console.log('Error getting all exam');
        console.log(err);
      }
    );
  }



  updateQuestion(id: number,form:NgForm) {
    this.updatedQuestion.header = form.value['header'];
    this.updatedQuestion.choice_1 = form.value['choice_1'];
    this.updatedQuestion.choice_2 = form.value['choice_2'];
    this.updatedQuestion.choice_3 = form.value['choice_3'];
    this.updatedQuestion.choice_4 = form.value['choice_4'];
    this.updatedQuestion.answer = form.value['answer'];
    this.updatedQuestion.score = form.value['score'];
    this.updatedQuestion.exam_id = this.exam_id;




    this.QuestionService.editQestion(id,this.updatedQuestion).subscribe(
      (res) => {
        // console.log(res);
        this.ngOnInit();
      },
      (err) => {
        console.log('Error updating Qestion ');
        console.log(err);
      }
    );
    this.router.navigate([`/dashboard/questions/${this.exam_id}`]);

  }

  resetForm(form: NgForm) {
    form.reset();
  }
}





