import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/_services/courses.service';
import { ExamResultService, result } from 'src/app/_services/exam-result.service';
import { ExamsService } from 'src/app/_services/exams.service';
import { StudentService } from 'src/app/_services/student.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css'],
})
export class ResultComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private resultService: ExamResultService,
    private courseService: CoursesService,
    private examService: ExamsService
  ) {}

  result: result = {
    student_id: 0,
    exam_id: 0,
    degree: 0
  };

  newresult: result = {
    student_id: 0,
    exam_id: 0,
    degree: 0,
  };

  course_id: number = 0;
  exam_id: number = 0;
  exam_max_score: number = 0;
  studentName: string = localStorage.getItem('name')!;
  courseName!: string;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.course_id = params['courseId'];
      // console.log(params);
    });
    this.getresult();
    this.getCourseById(this.course_id);
    this.getExamById(parseInt(localStorage.getItem('exam_id')!));
  }

  getresult() {
    this.result.student_id = parseInt(localStorage.getItem('id')!);
    this.result.exam_id = parseInt(localStorage.getItem('exam_id')!);
    // console.log(this.result);

    this.resultService.getresult(this.result).subscribe(
      (res) => {
        this.newresult = res;
        // console.log(this.newresult);
      },

      (err) => {
        console.log('cant load data from exam question');
        console.log(err);
      }
    );
  }

  getCourseById(id: number) {
    this.courseService.getCourseById(id).subscribe(
      (res) => {
        this.courseName = res.name!;
        // console.log(res);
        
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getExamById(id: number) {
    
    this.examService.getexam(id).subscribe(
      (res) => {
        this.exam_max_score = res.data.max_score!;
        // console.log(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
  }


  removeID()
  {
    localStorage.removeItem("exam_id");
  }
  
}
