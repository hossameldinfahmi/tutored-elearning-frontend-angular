import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Admin } from "src/app/_models/admin.model";
import { AdminService } from "src/app/_services/admin.service";

@Component({
  selector: "app-add-admin",
  templateUrl: "./add-admin.component.html",
  styleUrls: ["./add-admin.component.css"],
})
export class AddAdminComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private router: Router,
    private toastr: ToastrService
  ) {}

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
        this.toastr.success("Admin added successfully!", "Success");
      },
      (err: HttpErrorResponse) => {
        if (err.error && err.error.error) {
          const errors = err.error.error;
          const errorFields = Object.keys(errors);
          errorFields.forEach((field) => {
            const errorMessages = errors[field].join(". ");
            this.toastr.error(`${field}: ${errorMessages}`, "Error");
          });
        } else {
          this.toastr.error("Something went wrong", "Error");
        }
      }
    );
    this.router.navigate(["/dashboard/admins"]);
  }
}
