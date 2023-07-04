import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { StudentService } from "src/app/_services/student.service";
import { ToastrService } from "ngx-toastr";
import { TrainerService } from "src/app/_services/trainer.service";

@Component({
  selector: "app-login-student",
  templateUrl: "./login-student.component.html",
  styleUrls: ["./login-student.component.css"],
})
export class LoginStudentComponent implements OnInit {
  constructor(
    private studentService: StudentService,
    private router: Router,
    private toastr: ToastrService,
    private trainerService: TrainerService
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
      (res: any) => {
        localStorage.setItem("Authorization", "bearer " + res.access_token);
        localStorage.setItem("id", res.id + "");
        localStorage.setItem("role", res.role);
        localStorage.setItem("name", res.name);
        this.studentService.studentloginservice.emit(res);
        this.router.navigate(["/main/home"]);
        this.trainerService.checkUser.next("student");
      },
      (err: any) => {
        if (err.error.message === "Your email address is not verified.") {
          this.toastr.error(
            "Your email address is not verified, Resend verfiction mail and try again "
          );
        } else {
          this.toastr.error(
            "Login failed. Please check your email and password."
          );
        }
      }
    );
  }
  resendVerificationEmail() {
    this.studentService
      .resendMail(this.data.email, this.data.password)
      .subscribe(
        (data) => {
          this.toastr.success("Verfiction Mail Sent Successfully!", "Success");
        },
        (error) => {
          this.toastr.error("Something went wrong", "Error");
        }
      );
  }
  resetForm(form: NgForm) {
    form.reset();
  }
}
