import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Course } from "src/app/_models/course.model";
import { Exam } from "src/app/_models/exam.model";
import { CoursesService } from "src/app/_services/courses.service";
import { ExamsService } from "src/app/_services/exams.service";

@Component({
  selector: "app-edit-this-exam",
  templateUrl: "./edit-this-exam.component.html",
  styleUrls: ["./edit-this-exam.component.css"],
})
export class EditThisExamComponent implements OnInit {
  ExamArray!: Exam[];
  courese!: Course[];

  examContent: Exam = {
    course_id: 0,
    title: "",
  };

  updatedExam: Exam = {
    course_id: 0,
    title: "",
  };
  title: string = "";
  exam_id: number = 0;
  course_id: number = 0;
  constructor(
    private examService: ExamsService,
    private activatedRoute: ActivatedRoute,
    private CourseServices: CoursesService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const examIdParam = this.route.snapshot.paramMap.get("exam_id");
      if (examIdParam !== null) {
        this.exam_id = +examIdParam;
      }

      this.course_id = params["courseId"];

      // console.log(params);
      if (this.exam_id) {
        this.getExams(this.exam_id);
        // console.log(this.examContent);
      }
    });
  }

  getExams(id: number) {
    this.examService.getexam(id).subscribe(
      (res) => {
        this.examContent = res.data;
        console.log(res);
      },
      (err) => {
        console.log("Error getting exam");
        console.log(err);
      }
    );
  }

  updateExam(id: number, form: NgForm) {
    this.updatedExam.title = form.value["examName"];
    this.updatedExam.course_id = this.course_id;

    this.examService.editExam(id, this.title).subscribe(
      (res) => {
        // this.coursesContentsArr = res;
        // console.log(res);
        this.toastr.success("exam updated Successfully!", "Success");

        this.router.navigate([
          "/main/trainer/course/details/" + this.course_id + "/exams",
        ]);
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

  resetForm(form: NgForm) {
    form.reset();
  }
}
