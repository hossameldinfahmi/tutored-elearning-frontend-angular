import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Course } from "src/app/_models/course.model";
import { CourseContent } from "src/app/_models/course_content.model";
import { CourseContentService } from "src/app/_services/course-content.service";
import { CoursesService } from "src/app/_services/courses.service";

@Component({
  selector: "app-course-content-details",
  templateUrl: "./course-content-details.component.html",
  styleUrls: ["./course-content-details.component.css"],
})
export class CourseContentDetailsComponent implements OnInit {
  constructor(
    private CourseContentService: CourseContentService,
    private activatedRoute: ActivatedRoute,
    private courseService: CoursesService,
    private router: Router
  ) {}
  coursesContentsArr!: CourseContent[];
  course!: Course;
  id: number = 0;
  LiveCorses: any;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params["courseId"];
    });
    this.getAllCoursesContents();
    this.getCourseById(this.id);
    this.getAllLiveCoursesContents();
  }

  getCourseById(id: number) {
    this.courseService.getCourseById(id).subscribe(
      (res) => {
        this.course = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAllCoursesContents() {
    this.CourseContentService.getContentofspacificCourse(this.id).subscribe(
      (res) => {
        this.coursesContentsArr = res;
      },
      (err) => {
        console.log("Error getting courses contents");
        console.log(err);
      }
    );
  }

  getAllLiveCoursesContents() {
    this.CourseContentService.getCourseLive(this.id).subscribe(
      (res) => {
        this.LiveCorses = res;
      },
      (err) => {
        console.log("Error getting courses contents");
        console.log(err);
      }
    );
  }
  deleteLiveCourse(id: number) {
    this.CourseContentService.deleteCourseLive(id).subscribe(
      (res) => {
        // this.coursesContentsArr = res;
        // console.log(res);
        // this.router.navigate([`/main/trainer/course/details/${this.id}`]);
        this.ngOnInit();
      },
      (err) => {
        console.log("Error deleting course content");
        console.log(err);
      }
    );
  }

  deleteCourseContent(id: number) {
    this.CourseContentService.deleteCourseContent(id).subscribe(
      (res) => {
        // this.coursesContentsArr = res;
        // console.log(res);
        // this.router.navigate([`/main/trainer/course/details/${this.id}`]);
        this.ngOnInit();
      },
      (err) => {
        console.log("Error deleting course content");
        console.log(err);
      }
    );
  }
}
