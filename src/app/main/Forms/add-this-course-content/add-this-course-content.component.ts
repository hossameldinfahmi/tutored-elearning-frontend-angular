import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Course } from "src/app/_models/course.model";
import { CourseContent } from "src/app/_models/course_content.model";
import { CourseContentService } from "src/app/_services/course-content.service";
import { CoursesService } from "src/app/_services/courses.service";

@Component({
  selector: "app-add-this-course-content",
  templateUrl: "./add-this-course-content.component.html",
  styleUrls: ["./add-this-course-content.component.css"],
})
export class AddThisCourseContentComponent implements OnInit {
  CourseArray!: Course[];

  course!: Course;
  newContent: CourseContent = {
    course_id: 0,
    content: "",
    name: "",
  };

  id: number = 0;

  constructor(
    private CourseContentService: CourseContentService,
    private courseService: CoursesService,
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params["courseId"];
      // console.log(params);
    });
  }

  addCourseContent(form: NgForm) {
    this.newContent.name = form.value["contentName"];
    this.newContent.content = form.value["courseContent"];
    this.newContent.course_id = this.id;

    this.CourseContentService.addCourseContent(this.newContent).subscribe(
      (res) => {
        // this.coursesContentsArr = res;
        // console.log(res);
        this.toastr.success("Course Content Added Successfully!", "Success");
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

  onSubmit(form: NgForm) {
    // console.log(form);
    // console.log(form.value);
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}
