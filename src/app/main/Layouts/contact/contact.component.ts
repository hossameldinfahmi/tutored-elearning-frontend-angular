import { Component, OnInit } from "@angular/core";
import { ContactUsService } from "src/app/_services/contact-us.service";
import { Contactus } from "src/app/_models/contactus.model";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent implements OnInit {
  constructor(
    private contactService: ContactUsService,
    private toastr: ToastrService,
    private router: Router
  ) {}
  newcontact: Contactus = {
    email: "",
    name: "",
    subject: "",
    message: "",
  };
  recieved = false;
  ngOnInit(): void {}
  addContact(form: NgForm) {
    this.newcontact.name = form.value["name"];
    this.newcontact.email = form.value["email"];
    this.newcontact.subject = form.value["subject"];
    this.newcontact.message = form.value["message"];

    // console.log(this.newContent);

    this.contactService.addContact(this.newcontact).subscribe(
      (res) => {
        // this.coursesContentsArr = res;
        // console.log(res);
        this.toastr.success("Sent Successfully!", "Success");
        this.router.navigate(["main/home"]);
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

  onSubmit(form: NgForm) {
    // console.log(form);
    // console.log(form.value);
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}
