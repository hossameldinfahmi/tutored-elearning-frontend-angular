import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Exam } from 'src/app/_models/exam.model';
import { QuestionService } from 'src/app/_services/question.service';
import { Question } from '../../../_models/question.model';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  constructor(private QuestionService: QuestionService ,private router: Router ,    private activatedRoute: ActivatedRoute,
    ) { }

  QuetionArray!: Question[];
  Quetion!: Question;
  p: number = 1;
  QuetionExam!:Exam;
  id:number=0;
  ngOnInit(): void {

    this.getAll();

    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
     if(this.id) {
       this.getAllQuestionExam(this.id);
     }
    });


  }
  getAll() {
    this.QuestionService.getAllQuestion().subscribe(
      (res) => {
        this.QuetionArray = res.data;
        // console.log(res);

      },
      (err) => {
        console.log(err);
      },
      () => { }
    );


  }




  getone(id:number) {
    this.QuestionService.getoneQestion(id).subscribe(
      (res) => {
        this.Quetion = res.data;
        // console.log(res);
      },
      (err) => {
        console.log(err);
      },
      () => { }
    );
  }

  getAllQuestionExam(id:number) {
    this.QuestionService.getAllQuestionExam(id).subscribe(
      (res) => {
        this.QuetionExam = res.data;
        // console.log(res.data);
      },
      (err) => {
        console.log(err);
      },
      () => { }
    );
  }

  deleteQestion(id:number){
    this.QuestionService.deleteQestion(id).subscribe(
      (res) => {
        // console.log(res.data);
        this.ngOnInit();
      },
      (err) => {
        console.log('Error deleting deleteQestion ');
        console.log(err);
      }
    );
      }


}



