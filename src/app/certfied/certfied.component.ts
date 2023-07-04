import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-certfied",
  templateUrl: "./certfied.component.html",
  styleUrls: ["./certfied.component.css"],
})
export class CertfiedComponent {
  isVerified: boolean = true;
  studentName: string = "";
  courseTitle: string = "";
  courseId: string = "";

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const studentId = params["studentid"];
      const courseId = params["courseid"];
      const verificationNumber = params["verificationnumber"];

      // Make API call to verify certificate
      const apiUrl = `http://127.0.0.1:8000/api/verify/certificate/${studentId}/${courseId}/${verificationNumber}`;
      this.http.get(apiUrl).subscribe((response: any) => {
        if (response.message === "verified") {
          this.isVerified = true;
          this.studentName = response.student_name;
          this.courseTitle = response.course_name;
          this.courseId = response.verification_number;
        }
      });
    });
  }
}
