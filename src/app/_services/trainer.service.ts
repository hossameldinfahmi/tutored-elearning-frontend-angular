import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Trainer } from "../_models/trainer.model";
import { tap } from "rxjs/operators";

interface LoginResponse {
  name: string;
  id: number;
  role: string;
  access_token: string;
  token_type: string;
  expires_in: number;
}

@Injectable({
  providedIn: "root",
})
export class TrainerService {
  trainerloginservice: EventEmitter<any> = new EventEmitter<any>();

  constructor(private httpClient: HttpClient) {}

  getAllTrainers(): Observable<{
    data: Trainer[];
    status: boolean;
    error: any[];
  }> {
    return this.httpClient.get<{
      data: Trainer[];
      status: boolean;
      error: any[];
    }>(`${environment.baseUrl}trainers`);
  }

  getTrainerById(
    id: number
  ): Observable<{ data: Trainer; status: boolean; error: any[] }> {
    return this.httpClient.get<{
      data: Trainer;
      status: boolean;
      error: any[];
    }>(environment.baseUrl + "trainers/" + id);
  }

  deleteTrainerById(id: number): Observable<Trainer> {
    const token: string = localStorage.getItem("access_token")!;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.delete<Trainer>(
      environment.baseUrl + "trainers/" + id,
      { headers }
    );
  }

  addTrainer(
    data: any
  ): Observable<{ data: Trainer; status: boolean; error: any[] }> {
    return this.httpClient.post<{
      data: Trainer;
      status: boolean;
      error: any[];
    }>(environment.baseUrl + "trainers/register", data);
  }

  updateTrainer(
    id: number,
    updatedTrainer: any
  ): Observable<{ data: Trainer; status: boolean; error: any[] }> {
    const token: string = localStorage.getItem("access_token")!;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.post<{
      data: Trainer;
      status: boolean;
      error: any[];
    }>(`${environment.baseUrl}trainers/${id}`, updatedTrainer, { headers });
  }

  loginTrainer(data: any): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(environment.baseUrl + "trainers/login", data)
      .pipe(
        tap((response: LoginResponse) => {
          localStorage.setItem("access_token", response.access_token);
        })
      );
  }

  getTrainersCount(): Observable<number> {
    return this.httpClient.get<number>(`${environment.baseUrl}trainers/count`);
  }

  getCoursesOfTrainer(id: number): Observable<Trainer> {
    const token: string = localStorage.getItem("access_token")!;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get<Trainer>(
      `${environment.baseUrl}trainer/courses/${id}`,
      { headers }
    );
  }

  logoutTrainer() {
    const token: string = localStorage.getItem("access_token")!;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient
      .post(`${environment.baseUrl}trainers/logout`, null, {
        headers,
      })
      .pipe(
        tap(() => {
          localStorage.removeItem("access_token");
        })
      );
  }
}
