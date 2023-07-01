import { Component, NgModule, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AdminService } from "src/app/_services/admin.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {}

  data = { email: "", password: "" };

  login(form: NgForm) {
    if (form.invalid) {
      return;
    }
    // console.log(form);

    this.data.email = form.value.email;
    this.data.password = form.value.password;

    // console.log(this.data);

    this.adminService.Adminlogin(this.data).subscribe(
      (res: any) => {
        localStorage.setItem("Authorization", "bearer " + res.access_token);
        localStorage.setItem("id", res.id);
        localStorage.setItem("role", res.role);
        localStorage.setItem("name", res.name);

        this.router.navigate(["/dashboard/home"]);
      },
      (err: any) => {
        console.log("Error login");
        console.log(err);
        this.router.navigate(["/dashboard/login"]);
      }
    );
  }
}
