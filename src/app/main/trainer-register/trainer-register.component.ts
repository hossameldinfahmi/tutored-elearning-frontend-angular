import { Component, OnInit } from "@angular/core";
import { TrainerService } from "../../_services/trainer.service";
import { Trainer } from "src/app/_models/trainer.model";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-trainer-register",
  templateUrl: "./trainer-register.component.html",
  styleUrls: ["./trainer-register.component.css"],
})
export class TrainerRegisterComponent implements OnInit {
  constructor(private trainerService: TrainerService) {}
  ngOnInit(): void {}

  trainersArray!: Trainer[];

  newTrainer: Trainer = {
    fname: "",
    lname: "",
    gender: "", //
    phone: "",
    email: "",
    password: "",
  };

  addTrainer(form: NgForm) {
    console.log(form.value);
    this.newTrainer.fname = form.value["fname"];
    this.newTrainer.lname = form.value["lname"];
    this.newTrainer.gender = form.value["gender"];
    this.newTrainer.phone = form.value["phone"];
    this.newTrainer.email = form.value["email"];
    this.newTrainer.password = form.value["password"];

    this.trainerService.addTrainer(this.newTrainer).subscribe(
      (res) => {
        // console.log(res);
      },
      (err) => {
        console.log("Error registering Trainer");
        console.log(err);
      }
    );
  }

  onSubmit(form: NgForm) {
    // console.log(form);
    // console.log(form.value);
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}
