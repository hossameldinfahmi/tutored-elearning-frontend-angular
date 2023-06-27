import { Component, OnInit } from "@angular/core";
import { TrainerService } from "../../_services/trainer.service";
import { Trainer } from "src/app/_models/trainer.model";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-trainer-register",
  templateUrl: "./trainer-register.component.html",
  styleUrls: ["./trainer-register.component.css"],
})
export class TrainerRegisterComponent implements OnInit {
  constructor(
    private trainerService: TrainerService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {}

  trainersArray!: Trainer[];

  newTrainer: Trainer = {
    fname: "",
    lname: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
  };

  addTrainer(form: NgForm) {
    this.newTrainer.fname = form.value["fname"];
    this.newTrainer.lname = form.value["lname"];
    this.newTrainer.gender = form.value["gender"];
    this.newTrainer.phone = form.value["phone"];
    this.newTrainer.email = form.value["email"];
    this.newTrainer.password = form.value["password"];

    this.trainerService.addTrainer(this.newTrainer).subscribe(
      (res) => {
        if (res.status) {
          this.toastr.success("Trainer added successfully!", "Success");
          this.router.navigate(["/main/trainer/login"]);
          form.reset();
        }
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
