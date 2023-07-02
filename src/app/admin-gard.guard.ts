import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable, map } from "rxjs";
import { AdminService } from "./_services/admin.service";
import { LoginResponse } from "./_models/trainer.model";

@Injectable({
  providedIn: "root",
})
export class AdminGardGuard implements CanActivate {
  constructor(private router: Router, private adminService: AdminService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.adminService.currentUser.pipe(
      map((currentTrainer: LoginResponse) => {
        if (currentTrainer && currentTrainer.role === "isAdmin") {
          return true;
        } else {
          this.router.navigate(["/main/home"], {
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
