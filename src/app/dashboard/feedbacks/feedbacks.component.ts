import { Component, OnInit } from "@angular/core";

import { Feedback } from "../../_models/feedback.model";
import { FeedbackService } from "../../_services/feedback.service";
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-feedbacks",
  templateUrl: "./feedbacks.component.html",
  styleUrls: ["./feedbacks.component.css"],
})
export class FeedbacksComponent implements OnInit {
  constructor(
    private feedbackService: FeedbackService,
    private toastr: ToastrService
  ) {}

  feed!: Feedback[];
  p: number = 1;

  ngOnInit(): void {
    this.getAllfeedbacks();
  }

  getAllfeedbacks() {
    this.feedbackService.getAllfeedbacks().subscribe(
      (res) => {
        this.feed = res;
        // console.log(this.feed);
      },
      (err) => {
        console.log("Error in get all feeds");
        console.log(err);
      }
    );
  }

  deletefeedback(id: number) {
    this.feedbackService.deleteFeedbackById(id).subscribe(
      (res) => {
        // console.log(res);
        this.toastr.success("Feedback Deleted successfully!", "Success");

        this.ngOnInit();
      },
      (err: HttpErrorResponse) => {
        if (err.error && err.error.error) {
          const errors = err.error.error;
          const errorFields = Object.keys(errors);
          errorFields.forEach((field) => {
            const errorMessages = errors[field].join(". ");
            this.toastr.error(`${field}: ${errorMessages}`, "Error");
          });
        } else {
          this.toastr.error("Something went wrong", "Error");
        }
      }
    );
  }
}
