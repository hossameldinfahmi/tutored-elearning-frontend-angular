import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { StudentService } from "src/app/_services/student.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login-student",
  templateUrl: "./login-student.component.html",
  styleUrls: ["./login-student.component.css"],
})
export class LoginStudentComponent implements OnInit {
  constructor(
    private studentService: StudentService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  data = { email: "", password: "" };

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.data.email = form.value.email;
    this.data.password = form.value.password;
    this.studentService.checkStudent(this.data).subscribe(
      (res) => {
        console.log(res);
        localStorage.setItem("Authorization", "bearer " + res.access_token);
        localStorage.setItem("role", res.role);
        localStorage.setItem("id", res.id + "");
        sessionStorage.setItem("role", res.role);
        sessionStorage.setItem("id", res.id + "");
        localStorage.setItem("name", res.name);
        this.router.navigate(["/main/home"]);
        this.studentService.studentloginservice.emit(res);
        this.router.navigate(["/dashboard"]);
      },
      (err: Error) => {
        console.log("Error login");
        this.toastr.error(
          "Login failed. Please check your email and password."
        );
      }
    );
  }
}
