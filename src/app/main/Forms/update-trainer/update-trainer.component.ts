import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Trainer } from "src/app/_models/trainer.model";
import { TrainerService } from "src/app/_services/trainer.service";

@Component({
  selector: "app-update-trainer",
  templateUrl: "./update-trainer.component.html",
  styleUrls: ["./update-trainer.component.css"],
})
export class UpdateTrainerComponent implements OnInit {
  files: any = null;
  submitted = false;
  form!: FormGroup;
  // data!: Trainer;
  trainer: Trainer = {
    fname: "",
    lname: "",
    phone: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    img: "",
  };
  trainerId!: number;
  ff = new FormData();

  constructor(
    private trainerService: TrainerService,
    private formbuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.trainerId = parseInt(localStorage.getItem("id")!);
    this.getTrainer(this.trainerId);
    this.createForm();
  }

  getTrainer(id: number) {
    this.trainerService.getTrainerById(id).subscribe(
      (res) => {
        // console.log(res);
        this.trainer = res.data;
        // console.log(this.trainer);

        this.form = this.formbuilder.group({
          fname: [this.trainer.fname, Validators.required],
          lname: [this.trainer.lname, Validators.required],
          phone: [this.trainer.phone, Validators.required],
          facebook: [this.trainer.facebook],
          twitter: [this.trainer.twitter],
          linkedin: [this.trainer.linkedin],
          img: [null],
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  createForm() {
    this.form = this.formbuilder.group({
      fname: [this, Validators.required],
      lname: [this, Validators.required],
      phone: [this, Validators.required],
      facebook: [this],
      twitter: [this],
      linkedin: [this],
      img: [null],
    });
  }

  get f() {
    return this.form.controls;
  }

  updateTrainer(form: any) {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    // console.log(form.value);
    const formdata = new FormData();
    formdata.append("img", this.files, this.files.name);
    formdata.append("fname", form.value.fname);
    formdata.append("lname", form.value.lname);
    formdata.append("phone", form.value.phone);
    formdata.append("facebook", form.value.facebook);
    formdata.append("twitter", form.value.twitter);
    formdata.append("linkedin", form.value.linkedin);

    // console.log(formdata);

    this.trainerService.updateTrainer(this.trainerId, formdata).subscribe(
      (res) => {
        console.log(res);

        // console.log(res);

        const name: any = res.data.fname;
        localStorage.setItem("name", name);
        this.trainerService.getTrainerById(this.trainerId).subscribe(
          (res: any) => {
            localStorage.setItem("img", res.data.img);
            window.location.reload();
          },
          (error: Error) => {
            console.log(error);
          }
        );

        this.toastr.success("Uploded Successfully!", "Success");
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

  uploadImage(event: any) {
    this.files = event.target.files[0];
    // console.log(this.files);
  }

  resetForm(form: FormGroup) {
    form.reset();
  }
}
