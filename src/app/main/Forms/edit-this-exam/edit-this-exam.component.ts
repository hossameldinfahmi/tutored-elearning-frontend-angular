import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/_models/course.model';
import { Exam } from 'src/app/_models/exam.model';
import { CoursesService } from 'src/app/_services/courses.service';
import { ExamsService } from 'src/app/_services/exams.service';

@Component({
  selector: 'app-edit-this-exam',
  templateUrl: './edit-this-exam.component.html',
  styleUrls: ['./edit-this-exam.component.css']
})
export class EditThisExamComponent implements OnInit {

  ExamArray!:Exam[];
  courese!: Course[];

  examContent: Exam = {
    course_id: 0,
    max_score: 0,
    name: '',
  };

  updatedExam: Exam = {
    course_id: 0,
    max_score: 0,
    name: '',
  };
exam_id:number=0;
course_id:number=0;
  constructor(   private examService: ExamsService,
    private activatedRoute: ActivatedRoute,private CourseServices:CoursesService,private router:Router) { }


    ngOnInit(): void {
      this.activatedRoute.params.subscribe((params) => {
        this.exam_id = params['exam_id'];
        this.course_id = params['courseId'];

        // console.log(params);
        if (this.exam_id) {
          this.getExams(this.exam_id);
          // console.log(this.examContent);
        }
      });
     
    }



    getExams(id: number) {
      this.examService.getexam(id).subscribe(
        (res) => {
          this.examContent = res.data;
          // console.log(res);

        },
        (err) => {
          console.log('Error getting exam');
          console.log(err);
        }
      );
    }

    updateExam(id: number,form:NgForm) {
      this.updatedExam.name = form.value['examName'];
      this.updatedExam.course_id = this.course_id;
      this.updatedExam.max_score = form.value['max_score'];
      // console.log(this.updatedExam);
      this.examService.editExam(id,this.updatedExam).subscribe(
        (res) => {
          // this.coursesContentsArr = res;
          // console.log(res);
          this.router.navigate(['/main/trainer/course/details/'+this.course_id+'/exams'])
          this.ngOnInit();
        },
        (err) => {
          console.log('Error updating course content');
          console.log(err);
        }
      );
    }

    resetForm(form: NgForm) {
      form.reset();
    }





}
