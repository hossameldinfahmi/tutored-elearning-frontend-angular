import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";

@Component({
  selector: "app-register-student",
  templateUrl: "./register-student.component.html",
  styleUrls: ["./register-student.component.css"],
})
export class RegisterStudentComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}

  newStudent: any = {
    fname: "",
    lname: "",
    gender: "", //enum
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
  }

  onSubmit(form: NgForm) {}

  resetForm(form: NgForm) {
    form.reset();
  }
}
