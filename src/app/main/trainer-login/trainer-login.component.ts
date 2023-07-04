import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { TrainerService } from "../../_services/trainer.service";
import { ToastrService } from "ngx-toastr";
import { NavbarMainComponent } from "src/app/navbar-main/navbar-main.component";

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
    if (form.invalid) {
      return;
    }
    this.trainer.email = form.value["email"];
    this.trainer.password = form.value["password"];
    this.trainerService.loginTrainer(this.trainer).subscribe(
      (res: any) => {
        localStorage.setItem("Authorization", "bearer " + res.access_token);
        localStorage.setItem("id", res.id + "");
        localStorage.setItem("role", res.role);
        localStorage.setItem("name", res.name);
        this.trainerService.trainerloginservice.emit(res);
        this.router.navigate(["/main/home"]);
        this.trainerService.checkUser.next("trainer");
        this.trainerService.getTrainerById(res.id).subscribe(
          (res: any) => {
            localStorage.setItem("img", res.data.img);
          },
          (error: Error) => {
            console.log(error);
          }
        );
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
