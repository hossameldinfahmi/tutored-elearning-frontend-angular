import { Component, OnInit } from '@angular/core';
import { CategororyService } from 'src/app/_services/categorory.service';
import { CoursesService } from 'src/app/_services/courses.service';
import { StudentService } from 'src/app/_services/student.service';
import { TrainerService } from 'src/app/_services/trainer.service';
import { Category } from '../../_models/category.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
})
export class StatisticsComponent implements OnInit {
  categoryCount!: number;
  courseCount!: number;
  studentCount!: number;
  trainerCount!: number;

  constructor(
    private categoryService: CategororyService,
    private courseService: CoursesService,
    private studentService: StudentService,
    private trainerService: TrainerService
  ) {}

  ngOnInit(): void {
    this.getCategoriesCount();
    this.getCoursesCount();
    this.getStudentsCount();
    this.getTrainersCount();
  }

  getCategoriesCount() {
    this.categoryService.getCategoriesCount().subscribe(
      (res) => {
        this.categoryCount = res;
        // console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getCoursesCount() {
    this.courseService.getCoursesCount().subscribe(
      (res) => {
        this.courseCount = res;
        // console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  
  getStudentsCount() {
    this.studentService.getStudentsCount().subscribe(
      (res) => {
        this.studentCount = res;
        // console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getTrainersCount() {
    this.trainerService.getTrainersCount().subscribe(
      (res) => {
        this.trainerCount = res;
        // console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
