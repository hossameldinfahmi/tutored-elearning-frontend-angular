import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-trainersmain-component",
  templateUrl: "./trainersmain-component.component.html",
  styleUrls: ["./trainersmain-component.component.css"],
})
export class TrainersmainComponentComponent implements OnInit {
  constructor() {}

  TrainersArray: [] = [];
  array!: [];

  p: number = 1;
  url = "http://localhost:8000/uploads/trainer/";

  ngOnInit(): void {}
}
