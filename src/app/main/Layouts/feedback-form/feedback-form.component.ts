import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Feedback } from "src/app/_models/feedback.model";
import { FeedbackService } from "src/app/_services/feedback.service";

@Component({
  selector: "app-feedback-form",
  templateUrl: "./feedback-form.component.html",
  styleUrls: ["./feedback-form.component.css"],
})
export class FeedbackFormComponent implements OnInit {
  constructor(
    private feedbackService: FeedbackService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  feed!: Feedback[];
  newfeedback: Feedback = {
    id: 0,
    course: { id: 0, name: "" },
    student: { fname: "" },
    review: "",
    rating: 0,
    course_id: 0,
    student_id: 0,
  };

  id!: number;
  //recieved= false;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params["courseId"];
      // console.log(params);
    });
  }

  addFeedback(form: NgForm) {
    this.newfeedback.review = form.value["desc"];
    this.newfeedback.rating = form.value["rating"];
    this.newfeedback.student_id = parseInt(localStorage.getItem("id")!);
    this.newfeedback.course_id = this.id;
    this.newfeedback.name = localStorage.getItem("name")!;

    this.feedbackService
      .addFeeback(this.newfeedback, this.newfeedback.course_id)
      .subscribe(
        (res) => {
          this.router.navigate([`main/courses/details/${this.id}/videos`]);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onSubmit(form: NgForm) {
    // console.log(form);
    // console.log(form.value);
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}
