import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Trainer, LoginResponse } from "../_models/trainer.model";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class TrainerService {
  trainerloginservice: EventEmitter<any> = new EventEmitter<any>();
  private currentTrainerSubject: BehaviorSubject<LoginResponse> =
    new BehaviorSubject<LoginResponse>({
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

  constructor(private httpClient: HttpClient) {}

  get currentUser(): Observable<LoginResponse> {
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
