import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { StudentService } from "./_services/student.service";
import { AdminService } from "./_services/admin.service";
import { TrainerService } from "./_services/trainer.service";

@Injectable({
  providedIn: "root",
})
export class IsLoggedGuard implements CanActivate {
  constructor(
    private router: Router,
    private studentService: StudentService,
    private adminService: AdminService,
    private trainerService: TrainerService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!localStorage.getItem("Authorization")) return true;
    else {
      this.router.navigate(["/main/home"]);
      return false;
    }
  }
}
