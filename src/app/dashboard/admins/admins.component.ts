import { Component, OnInit } from "@angular/core";
import { AdminService } from "src/app/_services/admin.service";
import { Admin } from "../../_models/admin.model";

@Component({
  selector: "app-admins",
  templateUrl: "./admins.component.html",
  styleUrls: ["./admins.component.css"],
})
export class AdminsComponent implements OnInit {
  constructor(private adminServicce: AdminService) {}

  AdminsArray: Admin[] = [
    {
      id: 1,
      name: "sara",
      email: "xdgh@hgsd.com",
      password: "2145",
    },
  ];

  ngOnInit(): void {
    this.getAllAdmins();
  }

  getAllAdmins() {
    this.adminServicce.getAllAdmins().subscribe(
      (res) => {
        this.AdminsArray = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
