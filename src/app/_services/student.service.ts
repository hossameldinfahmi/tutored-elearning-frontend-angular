import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Student } from "../_models/student.model";
interface student {
  name: string;
  access_token: any;
  token_type: any;
  expires_in: any;
  id: any;
  role: any;
}
@Injectable({
  providedIn: "root",
})
export class StudentService {
  studentloginservice: EventEmitter<any> = new EventEmitter<any>();

  constructor(private httpClient: HttpClient) {}
  getAllStudents(): Observable<{
    data: Student[];
    status: boolean;
    error: any[];
  }> {
    const token: string = localStorage.getItem("Authorization")!;
    const headers = new HttpHeaders({
      Authorization: token,
    });
    return this.httpClient.get<{
      data: Student[];
      status: boolean;
      error: any[];
    }>(`${environment.baseUrl}students`, { headers });
  }

  addStudent(
    newStudent: Student
  ): Observable<{ data: Student; status: boolean; error: any[] }> {
    return this.httpClient.post<{
      data: Student;
      status: boolean;
      error: any[];
    }>(`${environment.baseUrl}student/register`, newStudent);
  }

  getStudentById(
    id: number
  ): Observable<{ data: Student; status: boolean; error: any[] }> {
    const token: string = localStorage.getItem("Authorization")!;
    const headers = new HttpHeaders({
      Authorization: token,
    });
    return this.httpClient.get<{
      data: Student;
      status: boolean;
      error: any[];
    }>(environment.baseUrl + "students/" + id, { headers });
  }

  deleteStudentById(id: number): Observable<Student> {
    const token: string = localStorage.getItem("Authorization")!;
    const headers = new HttpHeaders({
      Authorization: token,
    });
    return this.httpClient.delete<Student>(
      environment.baseUrl + "students/" + id,
      { headers }
    );
  }

  updateStudent(
    id: number,
    updatedStudent: any
  ): Observable<{ data: Student; status: boolean; error: any[] }> {
    const token: string = localStorage.getItem("Authorization")!;
    const headers = new HttpHeaders({
      Authorization: token,
    });
    return this.httpClient.post<{
      data: Student;
      status: boolean;
      error: any[];
    }>(`${environment.baseUrl}students/${id}`, updatedStudent, { headers });
  }

  checkStudent(data: any): Observable<student> {
    return this.httpClient.post<student>(
      environment.baseUrl + "student/login/",
      data
    );
  }

  getStudentsCount(): Observable<number> {
    return this.httpClient.get<number>(`${environment.baseUrl}students/count`);
  }

  getCoursesOfStudent(id: number): Observable<Student> {
    const token: string = localStorage.getItem("Authorization")!;
    const headers = new HttpHeaders({
      Authorization: token,
    });
    return this.httpClient.get<Student>(
      `${environment.baseUrl}student/courses/${id}`,
      { headers }
    );
  }

  logoutStudent() {
    const token: string = localStorage.getItem("Authorization")!;
    const headers = new HttpHeaders({
      Authorization: token,
    });
    return this.httpClient.post(`${environment.baseUrl}student/logout`, null, {
      headers,
    });
  }
}
