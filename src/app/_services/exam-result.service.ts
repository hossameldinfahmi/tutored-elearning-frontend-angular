import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
export interface result 
{
  exam_id?:number,
  student_id?:number,
  degree?:number

}
@Injectable({
  providedIn: 'root'
})

export class ExamResultService {

  constructor(private httpClient: HttpClient) { }
  getresult(data: result):Observable<result>{
    const token: string = localStorage.getItem('Authorization')!;
    const headers = new HttpHeaders({
      Authorization: token
    })

    return this.httpClient.get<result>(`${environment.baseUrl}result/${data.exam_id}/${data.student_id}`,{headers})
  }


  addResult(data:any) {
    const token: string = localStorage.getItem('Authorization')!;
    const headers = new HttpHeaders({
      Authorization: token
    })
  
     return this.httpClient.post(`${environment.baseUrl}Storedegree`,data,{headers});
  }
}
