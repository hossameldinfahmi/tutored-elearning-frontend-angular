import { Component, OnInit } from "@angular/core";

import { Feedback } from "src/app/_models/feedback.model";

import { FeedbackService } from "src/app/_services/feedback.service";
import { SwiperOptions } from "swiper";

@Component({
  selector: "app-feedback",
  templateUrl: "./feedback.component.html",
  styleUrls: ["./feedback.component.css"],
})
export class FeedbackComponent implements OnInit {
  constructor(private feedbackService: FeedbackService) {}
  // FeedbackArray:Feedback[]=[
  //   {id:1,desc:"sgjvash asxbksjhbx",student_id:{fname:"sara"},course_id:{name:"web development",id:1}}
  // ]
  feedbacks!: Feedback[];

  ngOnInit(): void {
    this.getAllfeedbacks();
  }

  getAllfeedbacks() {
    this.feedbackService.getAllfeedbacks().subscribe(
      (res: any) => {
        this.feedbacks = res;
        console.log(this.feedbacks);
      },
      (err: any) => {
        console.log("Error in get all feeds");
        console.log(err);
      }
    );
  }

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
