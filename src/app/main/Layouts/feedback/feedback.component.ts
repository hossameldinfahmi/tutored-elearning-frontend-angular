import { Component, OnInit } from "@angular/core";

import { Feedback } from "src/app/_models/feedback.model";

@Component({
  selector: "app-feedback",
  templateUrl: "./feedback.component.html",
  styleUrls: ["./feedback.component.css"],
})
export class FeedbackComponent implements OnInit {
  constructor() {}

  feedbacks!: Feedback[];

  ngOnInit(): void {
    this.getAllfeedbacks();
  }

  getAllfeedbacks() {}
}
