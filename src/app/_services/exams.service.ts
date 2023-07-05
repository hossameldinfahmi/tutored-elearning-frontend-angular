import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Exam } from "../_models/exam.model";
import { Question } from "../_models/question.model";
import { Course } from "../_models/course.model";
@Injectable({
  providedIn: "root",
})
export class ExamsService {
  constructor(private httpClient: HttpClient) {}

  getAllExams(): Observable<{ data: Exam[]; status: boolean; error: any }> {
    const token: string = localStorage.getItem("Authorization")!;
    const headers = new HttpHeaders({
      Authorization: token,
    });
    return this.httpClient.get<{ data: Exam[]; status: boolean; error: any }>(
      environment.baseUrl + "exams",
      { headers }
    );
  }

  addExam(newExam: Exam): Observable<Exam> {
    const token: string = localStorage.getItem("Authorization")!;
    console.log("====================================");
    console.log(newExam);
    console.log("====================================");
    const headers = new HttpHeaders({
      Authorization: token,
    });
    console.log(token);
    return this.httpClient.post<Exam>(`${environment.baseUrl}exams`, newExam, {
      headers,
    });
  }

  getexam(id: number): Observable<{ data: Exam; status: boolean; error: any }> {
    const token: string = localStorage.getItem("Authorization")!;
    const headers = new HttpHeaders({
      Authorization: token,
    });
    return this.httpClient.get<{ data: Exam; status: boolean; error: any }>(
      `${environment.baseUrl}exams/${id}`,
      { headers }
    );
  }

  getExamsOfCourse(id: number): Observable<any> {
    const token: string = localStorage.getItem("Authorization")!;
    const headers = new HttpHeaders({
      Authorization: token,
    });
    return this.httpClient.get<{ data: Exam; status: boolean; error: any }>(
      `${environment.baseUrl}courses/${id}/exams`,
      { headers }
    );
  }

  editExam(id: number, updatedExam: any): Observable<Exam> {
    const token: string = localStorage.getItem("Authorization")!;
    const headers = new HttpHeaders({
      Authorization: token,
    });
    // console.log(id);
    // console.log(updatedExam);

    return this.httpClient.put<Exam>(
      `${environment.baseUrl}exams/${id}`,
      updatedExam,
      { headers }
    );
  }

  deleteExam(id: number) {
    // console.log(id)
    const token: string = localStorage.getItem("Authorization")!;
    const headers = new HttpHeaders({
      Authorization: token,
    });
    return this.httpClient.delete<{ data: Exam; status: boolean; error: any }>(
      `${environment.baseUrl}exams/${id}`,
      { headers }
    );
  }
}
