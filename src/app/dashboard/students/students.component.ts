import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/_services/student.service';
import { Student } from '../../_models/student.model';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  constructor(private studentservice:StudentService ) {}

  StudentsArray:Student[]=[]



url="http://localhost:8000/uploads/students/";
  p: number = 1;

  ngOnInit(): void {
    this.getAllstudents();
  }

  getAllstudents() {
    this.studentservice.getAllStudents().subscribe(
      (res) => {
        this.StudentsArray = res.data;
        // console.log(this.StudentsArray);
      },
      (err) => {
        console.log('error in get students');
        console.log(err);
      }
    );}

 deleteStudent(id:number){
      this.studentservice.deleteStudentById(id).subscribe(
        (res) => {
          // console.log(res);
          this.ngOnInit();
        },
        (err) => {
          console.log('Error deleting student');
          console.log(err);
        }
      );
    }



}
