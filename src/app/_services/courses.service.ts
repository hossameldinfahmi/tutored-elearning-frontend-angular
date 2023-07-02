import { Injectable } from "@angular/core";
import { Course } from "../_models/course.model";
import { Category } from "../_models/category.model";
import { Trainer } from "../_models/trainer.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
//import { url } from "inspector";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { identifierName } from "@angular/compiler";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  constructor(private httpClient: HttpClient) {}

  getAllCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>(`${environment.baseUrl}courses`);
  }

  getCourseById(id: number): Observable<Course> {
    // const token: string = localStorage.getItem('Authorization')!;
    // const headers = new HttpHeaders({
    //   Authorization: token
    // })
    return this.httpClient.get<Course>(environment.baseUrl + "courses/" + id);
  }
  create(data: any) {
    const token: string = localStorage.getItem("Authorization")!;
    console.log(token);

    const headers = new HttpHeaders({
      Authorization: token,
    });

    return this.httpClient.post(environment.baseUrl + "courses", data, {
      headers,
    });
  }

  deleteCourseById(id: number): Observable<Course> {
    const token: string = localStorage.getItem("Authorization")!;
    const headers = new HttpHeaders({
      Authorization: token,
    });
    return this.httpClient.delete<Course>(
      environment.baseUrl + "courses/" + id,
      { headers }
    );
  }

  editCourse(id: number, updatedCourse: Course): Observable<Course> {
    const token: string = localStorage.getItem("Authorization")!;
    const headers = new HttpHeaders({
      Authorization: token,
    });

    return this.httpClient.post<Course>(
      environment.baseUrl + "courses/" + id,
      updatedCourse,
      { headers }
    );
  }

  updatecourse(id: number, data: any) {
    const token: string = localStorage.getItem("Authorization")!;
    const headers = new HttpHeaders({
      Authorization: token,
    });
    return this.httpClient.post(environment.baseUrl + "courses/" + id, data, {
      headers,
    });
  }

  enroll(course_id: number) {
    const token: string = localStorage.getItem("Authorization")!;
    const headers = new HttpHeaders({
      Authorization: token,
    });
    return this.httpClient.post(
      environment.baseUrl + "/student/storeCourse/",
      course_id,
      { headers }
    );
  }

  getCountStudentsInCourse(id: number): Observable<number> {
    return this.httpClient.get<number>(
      `${environment.baseUrl}student/studentCount/${id}`
    );
  }

  getCoursesCount(): Observable<number> {
    return this.httpClient.get<number>(`${environment.baseUrl}courses/count`);
  }
}
