import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Course } from "src/app/_models/course.model";
import { Exam, ExamResponse } from "src/app/_models/exam.model";
import { CoursesService } from "src/app/_services/courses.service";
import { ExamsService } from "src/app/_services/exams.service";

@Component({
  selector: "app-add-this-exam",
  templateUrl: "./add-this-exam.component.html",
  styleUrls: ["./add-this-exam.component.css"],
})
export class AddThisExamComponent implements OnInit {
  constructor(
    private examService: ExamsService,
    private activatedRoute: ActivatedRoute,
    private CourseServices: CoursesService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  newexam: Exam = {
    id: 0,
    course_id: 0,
    title: "",
  };
  courses!: Course[];
  id: number = 0;

  courese!: Course[];
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params["courseId"];
      // console.log(params);
    });
    this.getAllCourses();
  }
  addExam(form: NgForm) {
    this.newexam.title = form.value["examName"];
    this.newexam.course_id = this.id;

    this.examService.addExam(this.newexam).subscribe(
      (res) => {
        // this.coursesContentsArr = res;
        this.router.navigate([
          "/main/trainer/course/details/" + this.id + "/exams",
        ]);
        this.toastr.success("Exam added Successfully!", "Success");
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

  getAllCourses() {
    this.CourseServices.getAllCourses().subscribe(
      (res) => {
        this.courese = res;
      },
      (err) => {
        console.log("Error getting all courses");
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
