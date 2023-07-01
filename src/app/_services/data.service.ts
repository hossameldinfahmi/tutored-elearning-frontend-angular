import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs/internal/Observable";
@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(private httpClient: HttpClient) {}

  getSearchCourseName(name: string) {
    return this.httpClient.get(
      environment.baseUrl + `course/search_course?search_product=${name}`
    );
  }
}
