import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { Student } from "../_models/student.model";
import { LoginResponse } from "../_models/trainer.model";
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
  private currentStudentSubject: BehaviorSubject<LoginResponse | null> =
    new BehaviorSubject<LoginResponse | null>(null);

  constructor(private httpClient: HttpClient) {
    const token: string | null = localStorage.getItem("Authorization");
    const id: number | null = localStorage.getItem("id")
      ? Number(localStorage.getItem("id"))
      : null;
    const name: string | null = localStorage.getItem("name");
    const role: string | null = localStorage.getItem("role");

    if (token && id && name && role) {
      const loginResponse: LoginResponse = {
        name: name,
        id: id,
        role: role,
        access_token: token,
        token_type: "bearer",
        expires_in: 0,
        accessToken: "",
        tokenType: "",
        expiresIn: 0,
      };
      this.currentStudentSubject.next(loginResponse);
    } else {
      this.currentStudentSubject.next(null);
    }
  }
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

  get currentUser(): Observable<any> {
    return this.currentStudentSubject.asObservable();
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
    return this.httpClient
      .post(`${environment.baseUrl}student/logout`, null, {
        headers,
      })
      .pipe(
        tap(() => {
          localStorage.removeItem("access_token");
          this.currentStudentSubject.next({
            name: "",
            id: 0,
            role: "",
            access_token: "",
            token_type: "",
            expires_in: 0,
            accessToken: "",
            tokenType: "",
            expiresIn: 0,
          });
        })
      );
  }
  resendMail(email: any, password: any): Observable<any> {
    const token: string = localStorage.getItem("Authorization")!;

    const body = { email: email };

    return this.httpClient.post<any>(
      `${environment.baseUrl}email/verify/resend`,
      body
    );
  }
}
