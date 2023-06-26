import { Component, OnInit } from "@angular/core";

import { Feedback } from "src/app/_models/feedback.model";

import { SwiperOptions } from "swiper";

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

  //swiper
  config: SwiperOptions = {
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    autoplay: {
      delay: 3000,
    },
    spaceBetween: 30,
  };
}
