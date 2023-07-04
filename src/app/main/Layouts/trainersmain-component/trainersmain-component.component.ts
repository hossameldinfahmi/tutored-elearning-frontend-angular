import { Component, OnInit } from "@angular/core";
import { Trainer } from "src/app/_models/trainer.model";
import { TrainerService } from "src/app/_services/trainer.service";

@Component({
  selector: "app-trainersmain-component",
  templateUrl: "./trainersmain-component.component.html",
  styleUrls: ["./trainersmain-component.component.css"],
})
export class TrainersmainComponentComponent implements OnInit {
  constructor(private trainerservice: TrainerService) {}

  TrainersArray: Trainer[] = [];
  array!: Trainer[];

  p: number = 1;
  url = "http://localhost:8000/uploads/trainer/";

  ngOnInit(): void {
    this.getAlltrainers();
  }

  getAlltrainers() {
    this.trainerservice.getAllTrainers().subscribe(
      (res) => {
        this.TrainersArray = res.data;
        // this.array = this.TrainersArray.slice(0,3);
      },
      (err) => {
        console.log("error in get trainers");
        console.log(err);
      }
    );
  }
}
