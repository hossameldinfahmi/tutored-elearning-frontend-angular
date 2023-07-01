import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Course } from '../_models/course.model';
import { Exam } from '../_models/exam.model';
import { Question } from '../_models/question.model';

export interface ExamQuestion{
  id ?:number,
  name ?:string,
  course_id ?:number,
 
  max_score ?:number
  header?:string
  
 choice_1?:string,
 choice_2?:string,
 choice_3?:string,
 choice_4?:string,
 answer?:string,
 score?: number,
 exam_id?:number
}

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  constructor(private httpClient: HttpClient) {}

  getexamQuestions( id: number): Observable<{ data: ExamQuestion[]; status: boolean; error: any }> {
    const token: string = localStorage.getItem('Authorization')!;
    const headers = new HttpHeaders({
      Authorization: token
    })
    return this.httpClient.get<{ data: ExamQuestion[]; status: boolean; error: any }>(
      `${environment.baseUrl}exams/questions/${id}`,{headers}
    );
  }



  getAllQuestion(): Observable<{
    data: Question[];
    status: boolean;
    error: any;
  }> {
    const token: string = localStorage.getItem('Authorization')!;
    const headers = new HttpHeaders({
      Authorization: token
    })

    return this.httpClient.get<{
      data: Question[];
      status: boolean;
      error: any;
    }>(`${environment.baseUrl}questions`,{headers});
  }

  getAllQuestionExam(id: number): Observable<{
    data: Exam;
    status: boolean;
    error: any;
  }> {
    const token: string = localStorage.getItem('Authorization')!;
    const headers = new HttpHeaders({
      Authorization: token
    })

    return this.httpClient.get<{
      data: Exam;
      status: boolean;
      error: any;
    }>(`${environment.baseUrl}exam/questions/${id}`,{headers});
  }

  getoneQestion(
    id: number
  ): Observable<{ data: Question; status: boolean; error: any }> {
    const token: string = localStorage.getItem('Authorization')!;
    const headers = new HttpHeaders({
      Authorization: token
    })

    return this.httpClient.get<{ data: Question; status: boolean; error: any }>(
      `${environment.baseUrl}questions/${id}`,{headers}
    );
  }

  CreateQestion(data: Question): Observable<{ data: Question[]; status: boolean; error: any }> {
    const token: string = localStorage.getItem('Authorization')!;
    const headers = new HttpHeaders({
      Authorization: token
    })
    return this.httpClient.post<{
      data: Question[];
      status: boolean;
      error: any;
    }>(`${environment.baseUrl}questions`,data,{headers});
  }

  editQestion(
    id: number,
    updatedContent: Question
  ): Observable<{ data: Question[]; status: boolean; error: any }> {
    // console.log(id);
    // console.log(updatedContent);
    const token: string = localStorage.getItem('Authorization')!;
    const headers = new HttpHeaders({
      Authorization: token
    })
    return this.httpClient.post<{
      data: Question[];
      status: boolean;
      error: any;
    }>(`${environment.baseUrl}questions/${id}`, updatedContent,{headers});
  }

  deleteQestion(id: number) {
    // console.log(id);
    const token: string = localStorage.getItem('Authorization')!;
    const headers = new HttpHeaders({
      Authorization: token
    })
    return this.httpClient.delete<{
      data: Question;
      status: boolean;
      error: any;
    }>(`${environment.baseUrl}questions/${id}`,{headers});
  }


  
}
