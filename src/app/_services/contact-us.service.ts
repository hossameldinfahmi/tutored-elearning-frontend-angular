import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Contactus } from "../_models/contactus.model";

@Injectable({
  providedIn: "root",
})
export class ContactUsService {
  constructor(private httpClient: HttpClient) {}

  getAllContacs(): Observable<Contactus[]> {
    const token: string = localStorage.getItem("Authorization")!;
    const headers = new HttpHeaders({
      Authorization: token,
    });
    return this.httpClient.get<Contactus[]>(
      `${environment.baseUrl}Contact_us`,
      { headers }
    );
  }

  deleteContact(id: number) {
    const token: string = localStorage.getItem("Authorization")!;
    const headers = new HttpHeaders({
      Authorization: token,
    });
    return this.httpClient.delete<Contactus>(
      environment.baseUrl + "Contact_us/" + id,
      { headers }
    );
  }

  addContact(newContact: Contactus): Observable<Contactus> {
    return this.httpClient.post<Contactus>(
      `${environment.baseUrl}Contact_us`,
      newContact
    );
  }
}
