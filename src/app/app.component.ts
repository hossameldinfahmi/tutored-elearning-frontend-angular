import { Component } from "@angular/core";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { map, Observable } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "online-courses-dashboard";
  active: boolean = false;
  active1: boolean = false;

  url1: string = "/dashboard";
  url2: string = "/main";
  routeurl1!: string;
  routeurl2!: string;

  active3: boolean = false;
  logindash: string = "/dashboard/login";
  routeurl3!: string;

  constructor(public router: Router) {
    this.router.events.subscribe((events) => {
      if (events instanceof NavigationEnd) {
        this.routeurl1 = this.router.url.slice(0, 10);
        this.routeurl2 = this.router.url.slice(0, 5);
        this.routeurl3 = this.router.url.slice(0, 16);

        const role = localStorage.getItem("role");

        if (
          this.url1 == this.routeurl1 &&
          this.logindash !== this.routeurl3 &&
          role == "isAdmin"
        ) {
          this.active = true;
          this.active1 = false;
          this.active3 = false;
        } else if (
          this.url1 == this.routeurl1 &&
          this.logindash !== this.routeurl3 &&
          role != "isAdmin"
        ) {
          this.router.navigate(["/dashboard/login"]);
        }

        if (this.url2 == this.routeurl2) {
          this.active1 = true;
          this.active = false;
          this.active3 = false;
        }

        if (this.logindash == this.routeurl3) {
          this.active3 = true;
          this.active1 = false;
          this.active = false;
        }
      }
    });
  }
}
