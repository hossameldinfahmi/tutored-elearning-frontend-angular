import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Admin } from "src/app/_models/admin.model";
import { AdminService } from "src/app/_services/admin.service";

@Component({
  selector: "app-add-admin",
  templateUrl: "./add-admin.component.html",
  styleUrls: ["./add-admin.component.css"],
})
export class AddAdminComponent implements OnInit {
  constructor(private adminService: AdminService, private router: Router) {}

  admin: Admin = {
    name: "",
    email: "",
    password: "",
  };

  ngOnInit(): void {}

  addAdmin(form: NgForm) {
    this.admin.name = form.value["name"];
    this.admin.email = form.value["email"];
    this.admin.password = form.value["password"];
    // console.log(form.value);

    this.adminService.addAdmin(this.admin).subscribe(
      (res) => {
        // console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
    this.router.navigate(["/dashboard/admins"]);
  }
}
