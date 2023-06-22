import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-navbar-main",
  templateUrl: "./navbar-main.component.html",
  styleUrls: ["./navbar-main.component.css"],
})
export class NavbarMainComponent implements OnInit {
  constructor(private router: Router) {}
  checkUser!: string;
  id: number = parseInt(localStorage.getItem("id")!);
  userName: string = localStorage.getItem("name")!;

  ngOnInit(): void {
    this.checktoken();
    if (localStorage.getItem("role") == "isTrainer") this.checkUser = "trainer";
    else this.checkUser = "student";
    // console.log(this.checkUser);
  }

  token = false;

  checktoken() {
    if (localStorage.getItem("Authorization") === null) {
      this.token = true;
    } else {
      this.token = false;
    }
  }
}
