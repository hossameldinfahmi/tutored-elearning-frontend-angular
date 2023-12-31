import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Feedback } from "src/app/_models/feedback.model";
import { FeedbackService } from "src/app/_services/feedback.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-feedback-form",
  templateUrl: "./feedback-form.component.html",
  styleUrls: ["./feedback-form.component.css"],
})
export class FeedbackFormComponent implements OnInit {
  constructor(
    private feedbackService: FeedbackService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {}
  feed!: Feedback[];
  newfeedback: Feedback = {
    id: 0,
    course: { id: 0, name: "" },
    student: { fname: "" },
    rating: 0,
    review: "",
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
    this.newfeedback.student_id = parseInt(localStorage.getItem("id")!);
    this.newfeedback.course_id = this.id;
    this.newfeedback.name = localStorage.getItem("name")!;
    this.newfeedback.rating = form.value["rating"];

    // console.log(this.newfeedback);

    this.feedbackService
      .addFeeback(this.newfeedback, this.newfeedback.course_id)
      .subscribe(
        (res) => {
          this.toastr.success("Feedback added successfully", "Success");
          this.router.navigate([`main/courses/details/${this.id}/videos`]);
        },
        (err) => {
          this.toastr.error(err.error.message, "Error");
        }
      );
  }

  onSubmit(form: NgForm) {}

  resetForm(form: NgForm) {
    form.reset();
  }
}
