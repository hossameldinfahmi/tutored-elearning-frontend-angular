import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-trainer-login",
  templateUrl: "./trainer-login.component.html",
  styleUrls: ["./trainer-login.component.css"],
})
export class TrainerLoginComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}

  trainer = {
    email: "",
    password: "",
  };

  checkTrainer(form: NgForm) {
    this.trainer.email = form.value["email"];
    this.trainer.password = form.value["password"];
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}
