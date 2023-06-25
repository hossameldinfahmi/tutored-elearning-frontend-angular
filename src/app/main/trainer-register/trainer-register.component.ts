import { Component, OnInit } from "@angular/core";
import { TrainerService } from "../../_services/trainer.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-trainer-register",
  templateUrl: "./trainer-register.component.html",
  styleUrls: ["./trainer-register.component.css"],
})
export class TrainerRegisterComponent implements OnInit {
  constructor(TrainerService: TrainerService) {}
  ngOnInit(): void {}

  addTrainer(form: NgForm) {
    console.log("Hello World");
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}
