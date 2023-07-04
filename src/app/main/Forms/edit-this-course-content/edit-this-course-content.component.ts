import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Course } from "src/app/_models/course.model";
import { CourseContent } from "src/app/_models/course_content.model";
import { CourseContentService } from "src/app/_services/course-content.service";
import { CoursesService } from "src/app/_services/courses.service";

@Component({
  selector: "app-edit-this-course-content",
  templateUrl: "./edit-this-course-content.component.html",
  styleUrls: ["./edit-this-course-content.component.css"],
})
export class EditThisCourseContentComponent implements OnInit {
  CourseArray!: Course[];
  // CourseContentArray:CourseContent[]=[
  //   {id:1,course_id:1,content:"fgghhj jkhbk",name:"week 1"}
  // ];

  courseContent: CourseContent = {
    course_id: 0,
    content: "",
    name: "",
  };

  updatedContent: CourseContent = {
    course_id: 0,
    content: "",
    name: "",
  };
  id: number = 0;

  constructor(
    private CourseContentService: CourseContentService,
    private activatedRoute: ActivatedRoute,
    private courseService: CoursesService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params["courseId"];
      const id = params["contentId"];
      // console.log(params);
      if (id) {
        this.getCourseContent(id);
        // console.log(this.courseContent);
      }
    });
    this.getAllCourses();
  }

  getAllCourses() {
    this.courseService.getAllCourses().subscribe(
      (res) => {
        this.CourseArray = res;
        // console.log(this.CourseArray);
        this.toastr.success("Course Content Updated Successfully!", "Success");
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

  getCourseContent(id: number) {
    this.CourseContentService.getCourseContent(id).subscribe(
      (res) => {
        this.courseContent = res;
        // console.log(res);
      },
      (err) => {
        console.log("Error getting course content");
        console.log(err);
      }
    );
  }

  updateCourseContent(id: number, form: NgForm) {
    this.updatedContent.name = form.value["contentName"];
    this.updatedContent.content = form.value["courseContent"];
    this.updatedContent.course_id = this.id;
    // console.log(this.updatedContent);
    this.CourseContentService.editCourseContent(
      id,
      this.updatedContent
    ).subscribe(
      (res) => {
        // console.log(res);
        this.ngOnInit();
      },
      (err) => {
        console.log("Error updating course content");
        console.log(err);
      }
    );
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}
