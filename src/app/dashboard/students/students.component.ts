import { Component, OnInit } from "@angular/core";
import { StudentService } from "src/app/_services/student.service";
import { Student } from "../../_models/student.model";
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-students",
  templateUrl: "./students.component.html",
  styleUrls: ["./students.component.css"],
})
export class StudentsComponent implements OnInit {
  constructor(
    private studentservice: StudentService,
    private toastr: ToastrService
  ) {}

  StudentsArray: Student[] = [];

  url = "http://localhost:8000/uploads/students/";
  p: number = 1;

  ngOnInit(): void {
    this.getAllstudents();
  }

  getAllstudents() {
    this.studentservice.getAllStudents().subscribe(
      (res) => {
        this.StudentsArray = res.data;
        console.log(this.StudentsArray);
      },
      (err) => {
        console.log("error in get students");
        console.log(err);
      }
    );
  }

  deleteStudent(id: number) {
    this.studentservice.deleteStudentById(id).subscribe(
      (res) => {
        // console.log(res);
        this.ngOnInit();
        this.toastr.success("Student Deleted successfully!", "Success");
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
  }
}
