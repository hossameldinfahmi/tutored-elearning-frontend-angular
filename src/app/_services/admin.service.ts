import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Admin } from "../_models/admin.model";

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
  constructor(private httpClient: HttpClient) {}

  Adminlogin(data: any): Observable<admin> {
    return this.httpClient.post<admin>(environment.baseUrl + "login", data);
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
    // console.log(data);

    return this.httpClient.post<Admin>(
      `${environment.baseUrl}admins/add-admin`,
      data,
      { headers }
    );
  }
}
