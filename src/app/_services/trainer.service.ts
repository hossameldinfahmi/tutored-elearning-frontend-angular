import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Trainer, LoginResponse } from "../_models/trainer.model";

import { tap } from "rxjs/operators";
interface trainer {
  name: string;
  id: number;
  role: string;
  access_token: any;
  token_type: any;
  expires_in: any;
}
@Injectable({
  providedIn: "root",
})
export class TrainerService {
  trainerloginservice: EventEmitter<any> = new EventEmitter<any>();
  private currentTrainerSubject: BehaviorSubject<LoginResponse | null> =
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
      this.currentTrainerSubject.next(loginResponse);
    } else {
      this.currentTrainerSubject.next(null);
    }
  }
  get currentUser(): Observable<any> {
    return this.currentTrainerSubject.asObservable();
  }

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
    const token: string = localStorage.getItem("Authorization")!;
    const headers = new HttpHeaders({
      Authorization: token,
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

  loginTrainer(data: any): Observable<LoginResponse> {
    return this.httpClient
      .post<LoginResponse>(environment.baseUrl + "trainers/login", data)
      .pipe(
        tap((response: LoginResponse) => {
          this.currentTrainerSubject.next({
            name: response.name,
            id: response.id,
            role: response.role,
            access_token: response.access_token,
            token_type: response.token_type,
            expires_in: response.expires_in,
            accessToken: response.accessToken,
            tokenType: response.tokenType,
            expiresIn: response.expiresIn,
          });
        })
      );
  }

  getTrainersCount(): Observable<number> {
    return this.httpClient.get<number>(`${environment.baseUrl}trainers/count`);
  }

  updateTrainer(
    id: number,
    updatedTrainer: any
  ): Observable<{ data: Trainer; status: boolean; error: any[] }> {
    const token: string = localStorage.getItem("Authorization")!;
    const headers = new HttpHeaders({
      Authorization: token,
    });
    return this.httpClient.post<{
      data: Trainer;
      status: boolean;
      error: any[];
    }>(`${environment.baseUrl}trainers/${id}`, updatedTrainer, { headers });
  }

  checkTrainer(data: any): Observable<trainer> {
    return this.httpClient.post<trainer>(
      environment.baseUrl + "trainers/login",
      data
    );
  }

  getCoursesOfTrainer(id: number): Observable<Trainer> {
    const token: string = localStorage.getItem("Authorization")!;
    const headers = new HttpHeaders({
      Authorization: token,
    });
    return this.httpClient.get<Trainer>(
      `${environment.baseUrl}trainer/courses/${id}`,
      { headers }
    );
  }

  logoutTrainer() {
    const token: string = localStorage.getItem("Authorization")!;
    const headers = new HttpHeaders({
      Authorization: token,
    });

    return this.httpClient
      .post(`${environment.baseUrl}trainers/logout`, null, {
        headers,
      })
      .pipe(
        tap(() => {
          localStorage.removeItem("access_token");
          this.currentTrainerSubject.next({
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
}
