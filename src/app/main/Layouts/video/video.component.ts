import { Component, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { CourseContent } from "src/app/_models/course_content.model";
import { CourseContentService } from "src/app/_services/course-content.service";
import { ExamResultService } from "src/app/_services/exam-result.service";
import { result } from "src/app/_services/exam-result.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";

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
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private toastr: ToastrService
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

  LiveCorses: any;
  newProgress: number = 0;
  active: boolean = false;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params["courseId"];
      // console.log(params);
      if (this.id) {
        this.getCourseContent(this.id);
        this.getLiveCourse(this.id);
      }
      this.resultService.getProgress(this.id).subscribe(
        (data) => {
          this.newProgress = data.progress;

          console.log(data);
        },
        (error) => {
          console.error(error);
        }
      );
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

  getLiveCourse(id: number) {
    this.courseContentService.getCourseLive(id).subscribe(
      (res) => {
        this.LiveCorses = res.data;
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
  curr: number = 0;
  onTabClick(i: number) {
    let total = this.contentArr.length;
    if (i >= this.curr - 1) {
      this.curr = i + 1;
    }
    this.progress = (this.curr / total) * 100;

    this.resultService.updateProgress(this.id, this.progress).subscribe(
      (data: any) => {
        console.log(data);
      },
      (error: any) => {
        console.error(error);
      }
    );

    this.resultService.getProgress(this.id).subscribe(
      (data) => {
        this.newProgress = data.progress;

        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getCertificate() {
    const token: string = localStorage.getItem("Authorization")!;
    const headers = new HttpHeaders({
      Authorization: token,
    });

    const url = `http://127.0.0.1:8000/api/courses/${this.id}/completion`;
    this.http.get(url, { headers }).subscribe(
      (response: any) => {
        this.toastr.success(response.message);
      },
      (error: any) => {
        this.toastr.error(error.error.message);
      }
    );
  }
}
