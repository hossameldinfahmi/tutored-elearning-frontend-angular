import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { TrainerService } from "./_services/trainer.service";
import { LoginResponse } from "src/app/_models/trainer.model";

@Injectable({
  providedIn: "root",
})
export class StudentGuard implements CanActivate {
  constructor(private router: Router, private trainerService: TrainerService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.trainerService.currentUser.pipe(
      map((currentTrainer: LoginResponse) => {
        if (currentTrainer && currentTrainer.role === "isTrainer") {
          return true;
        } else {
          this.router.navigate(["/main/trainer/login"], {
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
