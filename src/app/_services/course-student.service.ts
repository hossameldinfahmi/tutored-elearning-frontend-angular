import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CourseStudent } from '../_models/course_student.model';


@Injectable({
  providedIn: 'root'
})
export class CourseStudentService {

  constructor(private httpClient: HttpClient) { }

  enroll(data:any)
  {
    const token: string = localStorage.getItem('Authorization')!;
    const headers = new HttpHeaders({
      Authorization: token
    })
    return this.httpClient.post(environment.baseUrl+'student/storeCourse',data,{headers});
  }

  course_student_enroll(data:any){
    return this.httpClient.post(environment.baseUrl+'studentcourseenroll',data);
}

}
