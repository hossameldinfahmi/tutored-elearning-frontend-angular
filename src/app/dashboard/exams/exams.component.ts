import { Component, OnInit } from '@angular/core';

import { Exam } from '../../_models/exam.model';
import { ExamsService } from '../../_services/exams.service';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.css'],
})
export class ExamsComponent implements OnInit {
  constructor(private examService: ExamsService) {}
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
      },
      (err) => {
        console.log('Error deleting exam');
      }
    );
  }
}
