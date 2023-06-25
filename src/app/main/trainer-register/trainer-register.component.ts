import { Component, OnInit } from "@angular/core";
import { TrainerService } from "../../_services/trainer.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-trainer-register",
  templateUrl: "./trainer-register.component.html",
  styleUrls: ["./trainer-register.component.css"],
})
export class TrainerRegisterComponent implements OnInit {
  constructor(private trainerService: TrainerService) {}
  ngOnInit(): void {}

  addTrainer(form: NgForm) {
    const formData = form.value;
    console.log("====================================");
    console.log(formData);
    console.log("====================================");
    this.trainerService.addTrainer(formData).subscribe(
      (response: any) => {
        console.log(response);
        form.resetForm();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}
