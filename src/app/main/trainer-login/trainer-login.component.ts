import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { TrainerService } from "../../_services/trainer.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-trainer-login",
  templateUrl: "./trainer-login.component.html",
  styleUrls: ["./trainer-login.component.css"],
})
export class TrainerLoginComponent implements OnInit {
  constructor(
    public router: Router,
    private trainerService: TrainerService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  trainer = {
    email: "",
    password: "",
  };

  login(form: NgForm) {
    this.trainer.email = form.value["email"];
    this.trainer.password = form.value["password"];
    this.trainerService.loginTrainer(this.trainer).subscribe(
      (response: any) => {
        console.log("Login successful:", response);
        this.router.navigate(["/dashboard"]);
      },
      (error: Error) => {
        console.log("Login failed:", error);
        this.toastr.error(
          "Login failed. Please check your email and password."
        );
      }
    );
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}
