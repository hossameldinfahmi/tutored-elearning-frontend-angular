import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Admin } from "../_models/admin.model";
import { LoginResponse } from "../_models/trainer.model";

interface admin {
  access_token: any;
  token_type: any;
  expires_in: any;
  id: any;
  name: any;
  role: any;
}
@Injectable({
  providedIn: "root",
})
export class AdminService {
  private currentAdminSubject: BehaviorSubject<LoginResponse | null> =
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
      this.currentAdminSubject.next(loginResponse);
    } else {
      this.currentAdminSubject.next(null);
    }
  }
  get currentUser(): Observable<any> {
    return this.currentAdminSubject.asObservable();
  }

  Adminlogin(data: any): Observable<admin> {
    return this.httpClient
      .post<admin>(environment.baseUrl + "login", data)
      .pipe(
        tap((response: LoginResponse) => {
          this.currentAdminSubject.next({
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

  Adminlogout() {
    const token: string = localStorage.getItem("Authorization")!;
    const headers = new HttpHeaders({
      Authorization: token,
    });
    // const headers =new HttpHeaders().set("Authorization", token);
    // console.log(headers);

    return this.httpClient.post(environment.baseUrl + "logout", null, {
      headers,
    });
  }

  getAllAdmins(): Observable<Admin[]> {
    const token: string = localStorage.getItem("Authorization")!;
    const headers = new HttpHeaders({
      Authorization: token,
    });
    return this.httpClient.get<Admin[]>(`${environment.baseUrl}admins`, {
      headers,
    });
  }

  addAdmin(data: any): Observable<Admin> {
    const token: string = localStorage.getItem("Authorization")!;
    const headers = new HttpHeaders({
      Authorization: token,
    });

    return this.httpClient.post<Admin>(
      `${environment.baseUrl}admins/add-admin`,
      data,
      { headers }
    );
  }
}
