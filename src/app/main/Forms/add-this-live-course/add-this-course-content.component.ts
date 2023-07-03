import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CourseLive } from "src/app/_models/courceLive.model";
import { Course } from "src/app/_models/course.model";
import { CourseContentService } from "src/app/_services/course-content.service";
import { CoursesService } from "src/app/_services/courses.service";

@Component({
  selector: "app-add-this-live-course",
  templateUrl: "./add-this-course-content.component.html",
  styleUrls: ["./add-this-course-content.component.css"],
})
export class AddThisLiveCourseComponent implements OnInit {
  CourseArray!: Course[];

  course!: Course;
  newContent: CourseLive = {
    meeting_id: 0,
    topic: "",
    start_time: "",
    duration: 0,
    password: "",
    join_url: "",
    start_url: "",
    course_id: 0,
  };

  id: number = 0;

  constructor(
    private CourseContentService: CourseContentService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params["courseId"];
    });
  }

  addCourseContent(form: NgForm) {
    this.newContent.meeting_id = form.value["MeetingIdName"];
    this.newContent.topic = form.value["topicContent"];
    this.newContent.start_time = form.value["startTime"];
    this.newContent.duration = form.value["durationContent"];
    this.newContent.password = form.value["password"];
    this.newContent.join_url = form.value["joinUrl"];
    this.newContent.start_url = form.value["StartUrl"];
    this.newContent.course_id = this.id;

    this.CourseContentService.addCourseLive(this.newContent).subscribe(
      (res) => {
        this.toastr.success("Trainer added successfully!", "Success");
        this.router.navigate(["/main/trainer/course/details/" + this.id]);
        form.reset();
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

  resetForm(form: NgForm) {
    form.reset();
  }
}
