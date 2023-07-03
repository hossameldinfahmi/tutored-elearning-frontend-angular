import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { CourseContent } from "src/app/_models/course_content.model";
import { CourseContentService } from "src/app/_services/course-content.service";
import { ExamResultService } from "src/app/_services/exam-result.service";
import { result } from "src/app/_services/exam-result.service";
@Component({
  selector: "app-video",
  templateUrl: "./video.component.html",
  styleUrls: ["./video.component.css"],
})
export class VideoComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private courseContentService: CourseContentService,
    private resultService: ExamResultService,
    private sanitizer: DomSanitizer
  ) {}
  urlArr: string[] = [""];
  contentArr!: CourseContent[];
  url1: any;
  id!: number;
  result: result = {
    student_id: 0,
    exam_id: 0,
  };
  newresult: result = {
    student_id: 0,
    exam_id: 0,
    degree: 0,
  };

  active: boolean = false;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params["courseId"];
      // console.log(params);
      if (this.id) {
        this.getCourseContent(this.id);
      }
    });
    this.getresult();
    this.activatedRoute.params.subscribe((params) => {
      const courseId = params["courseId"];
      if (courseId) {
        this.result.exam_id = courseId;
      }
    });
  }

  url: any;
  urlSecuredArr: any[] = [];

  getCourseContent(id: number) {
    this.courseContentService.getContentofspacificCourse(id).subscribe(
      (res) => {
        this.contentArr = res;
        for (let index = 0; index < this.contentArr.length; index++) {
          const url = this.contentArr[index].content!;
          const securedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
          this.urlSecuredArr[index] = securedUrl;
        }
      },
      (err) => {
        console.log("Error adding course content");
        console.log(err);
      }
    );
  }
  getresult() {
    this.result.student_id = parseInt(localStorage.getItem("id")!);

    this.resultService.getresult(this.result, this.result.exam_id).subscribe(
      (res) => {
        this.newresult = res;
        if (Object.keys(res).length === 0) {
          this.active = false;
        } else {
          this.active = true;
        }
      },

      (err) => {
        console.log("student result not found");
      }
    );
  }
  progress: number = 0;

  onTabClick(i: number) {
    let curr = i + 1;
    let totatl = this.contentArr.length;
    this.progress = (curr / totatl) * 100;

    console.log("====================================");
    console.log(this.progress);
    console.log("====================================");
  }
}
