import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-trainer-register",
  templateUrl: "./trainer-register.component.html",
  styleUrls: ["./trainer-register.component.css"],
})
export class TrainerRegisterComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }

  addTrainer(form: NgForm) {}

  resetForm(form: NgForm) {
    form.reset();
  }
}
