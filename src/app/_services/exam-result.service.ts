import { Injectable } from "@angular/core";

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
export interface result {
  exam_id?: number;
  student_id?: number;
  degree?: number;
}
@Injectable({
  providedIn: "root",
})
export class ExamResultService {
  constructor(private httpClient: HttpClient) {}
  getresult(data: any, course_id: any): Observable<any> {
    const token: string = localStorage.getItem("Authorization")!;
    const headers = new HttpHeaders({
      Authorization: token,
    });

    http: return this.httpClient.get<result>(
      `${environment.baseUrl}courses/${course_id}/exams/${data.exam_id}/degree`,
      { headers }
    );
  }

  addResult(data: any, course_id: any) {
    console.log("====================================");
    console.log(data);
    console.log(course_id);
    console.log("====================================");
    const token: string = localStorage.getItem("Authorization")!;
    const headers = new HttpHeaders({
      Authorization: token,
    });
    //localhost:8000/api/courses/1/exams/2/degree
    http: return this.httpClient.post(
      `${environment.baseUrl}courses/${course_id}/exams/${data.exam_id}/degree`,
      data,
      {
        headers,
      }
    );
  }
}
