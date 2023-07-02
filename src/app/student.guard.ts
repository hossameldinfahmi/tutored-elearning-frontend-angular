import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { LoginResponse } from "src/app/_models/trainer.model";
import { StudentService } from "./_services/student.service";

@Injectable({
  providedIn: "root",
})
export class StudentGuard implements CanActivate {
  constructor(private router: Router, private studentService: StudentService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.studentService.currentUser.pipe(
      map((currentTrainer: LoginResponse) => {
        if (currentTrainer && currentTrainer.role === "isStudent") {
          return true;
        } else {
          this.router.navigate(["/main/login/student"], {
            queryParams: {
              returnUrl: state.url,
            },
          });
          return false;
        }
      })
    );
  }
}
