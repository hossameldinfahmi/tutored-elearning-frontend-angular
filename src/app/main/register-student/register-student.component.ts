import { Component, OnInit } from "@angular/core";
import { StudentService } from "src/app/_services/student.service";
import { Student } from "src/app/_models/student.model";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-register-student",
  templateUrl: "./register-student.component.html",
  styleUrls: ["./register-student.component.css"],
})
export class RegisterStudentComponent implements OnInit {
  constructor(
    private studentService: StudentService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {}
  studentArray!: Student[];

  newStudent: Student = {
    fname: "",
    lname: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
  };

  addStudent(form: NgForm) {
    this.newStudent.fname = form.value["fname"];
    this.newStudent.lname = form.value["lname"];
    this.newStudent.gender = form.value["gender"];
    this.newStudent.phone = form.value["phone"];
    this.newStudent.email = form.value["email"];
    this.newStudent.password = form.value["password"];

    this.studentService.addStudent(this.newStudent).subscribe(
      (res) => {
        this.toastr.success("student added successfully!", "Success");
        this.router.navigate(["main/login/student"]);
        form.reset();
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

  resetForm(form: NgForm) {
    form.reset();
  }
}
