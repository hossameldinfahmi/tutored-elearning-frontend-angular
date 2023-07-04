import { Component, OnInit } from "@angular/core";

import { Contactus } from "../../_models/contactus.model";
import { ContactUsService } from "../../_services/contact-us.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-contact-us",
  templateUrl: "./contact-us.component.html",
  styleUrls: ["./contact-us.component.css"],
})
export class ContactUsComponent implements OnInit {
  p: number = 1;

  constructor(
    private contactUS: ContactUsService,
    private toastr: ToastrService
  ) {}

  ContactusArray!: Contactus[];

  newcontact!: Contactus;

  ngOnInit(): void {
    this.getAllcontacts();
  }

  getAllcontacts() {
    this.contactUS.getAllContacs().subscribe(
      (res) => {
        this.ContactusArray = res;
        console.log(this.ContactusArray);
      },
      (err) => {
        console.log("cant load data from contact us");
        console.log(err);
      }
    );
  }

  deleteContactus(id: number) {
    this.contactUS.deleteContact(id).subscribe(
      (res) => {
        // console.log(res);
        this.ngOnInit();
        this.toastr.success("Deleted successfully!", "Success");
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
  }
}
