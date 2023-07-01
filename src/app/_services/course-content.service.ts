import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CourseContent } from '../_models/course_content.model';

@Injectable({
  providedIn: 'root',
})
export class CourseContentService {


  constructor(private httpClient:HttpClient) {}


  getAllContents(): Observable<CourseContent[]> {
    const token: string = localStorage.getItem('Authorization')!;
    const headers = new HttpHeaders({
      Authorization: token
    })
    return this.httpClient.get<CourseContent[]>(`${environment.baseUrl}Course_content`,{headers});
  }

  getCourseContent(id: number): Observable<CourseContent> {
    const token: string = localStorage.getItem('Authorization')!;
    const headers = new HttpHeaders({
      Authorization: token
    })
    return this.httpClient.get<CourseContent>(`${environment.baseUrl}Course_content/${id}`,{headers})
  }


  getContentofspacificCourse(id: number): Observable<CourseContent[]> {
    const token: string = localStorage.getItem('Authorization')!;
    const headers = new HttpHeaders({
      Authorization: token
    })
    return this.httpClient.get<CourseContent[]>(`${environment.baseUrl}Course_content/show/${id}`,{headers})
  }

  addCourseContent(newContent : CourseContent): Observable<CourseContent> {
    // console.log(newContent);
    const token: string = localStorage.getItem('Authorization')!;
    const headers = new HttpHeaders({
      Authorization: token
    })
     return this.httpClient.post<CourseContent>(`${environment.baseUrl}Course_content`,newContent,{headers});
  }

  editCourseContent(id:number,updatedContent:CourseContent): Observable<CourseContent> {
    const token: string = localStorage.getItem('Authorization')!;
    const headers = new HttpHeaders({
      Authorization: token
    })
    return this.httpClient.put<CourseContent>(`${environment.baseUrl}Course_content/${id}`,updatedContent,{headers});
  }

  deleteCourseContent(id:number){
    const token: string = localStorage.getItem('Authorization')!;
    const headers = new HttpHeaders({
      Authorization: token
    })
    // console.log(id);
    return this.httpClient.delete<CourseContent>(`${environment.baseUrl}Course_content/${id}`,{headers});
  }



}


