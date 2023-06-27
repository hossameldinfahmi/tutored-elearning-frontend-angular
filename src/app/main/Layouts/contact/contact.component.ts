import { Component, OnInit } from "@angular/core";
import { ContactUsService } from "src/app/_services/contact-us.service";
import { Contactus } from "src/app/_models/contactus.model";
import { NgForm } from "@angular/forms";
@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"],
})
export class ContactComponent implements OnInit {
  constructor(private contactService: ContactUsService) {}
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
      },
      (err) => {
        console.log("Error adding contact");
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
