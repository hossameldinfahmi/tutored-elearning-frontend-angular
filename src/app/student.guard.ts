import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { StudentService } from "./_services/student.service";
import { LoginResponse } from "src/app/_models/trainer.model";

@Injectable({
  providedIn: "root",
})
export class StudentGuard implements CanActivate {
  islogged: boolean = false;

  constructor(private router: Router, private studentService: StudentService) {
    studentService.currentStudentSubject.subscribe(() => {
      if (studentService.currentStudentSubject.getValue()?.role == "isStudent")
        this.islogged = true;
      else this.islogged = false;
    });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.islogged) return true;
    else {
      this.router.navigate(["/main/login/student"], {
        queryParams: {
          returnUrl: state.url,
        },
      });
      return false;
    }

    //   return this.studentService.currentUser.pipe(
    //     map((currentTrainer: LoginResponse) => {
    //       if (currentTrainer && currentTrainer.role === "isStudent") {
    //         return true;
    //       } else {
    //         this.router.navigate(["/main/login/student"], {
    //           queryParams: {
    //             returnUrl: state.url,
    //           },
    //         });
    //         return false;
    //       }
    //     })
    //   );
  }
}
