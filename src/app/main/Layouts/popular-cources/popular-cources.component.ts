import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-popular-cources",
  templateUrl: "./popular-cources.component.html",
  styleUrls: ["./popular-cources.component.css"],
})
export class PopularCourcesComponent implements OnInit {
  coursesArr!: [];
  // trainersArr!: Trainer[];
  courseCount: number[] = [];
  start: number = 0;
  c_url = "http://localhost:8000/uploads/courses/";
  t_url = "http://localhost:8000/uploads/trainer/";

  constructor() {}
  url = "http://localhost:8000/uploads/courses/";

  courseArray!: [];
  Array!: [];

  ngOnInit(): void {}
}
