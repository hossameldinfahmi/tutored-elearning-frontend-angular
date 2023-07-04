import { Component, OnInit } from "@angular/core";
import { TrainerService } from "src/app/_services/trainer.service";
import { Trainer } from "../../_models/trainer.model";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-trainers",
  templateUrl: "./trainers.component.html",
  styleUrls: ["./trainers.component.css"],
})
export class TrainersComponent implements OnInit {
  constructor(
    private trainerservice: TrainerService,
    private toastr: ToastrService
  ) {}

  TrainersArray: Trainer[] = [];

  url = "http://localhost:8000/uploads/trainer/";
  p: number = 1;

  ngOnInit(): void {
    this.getAlltrainers();
  }

  getAlltrainers() {
    this.trainerservice.getAllTrainers().subscribe(
      (res) => {
        this.TrainersArray = res.data;
        console.log("====================================");
        console.log(res.data);
        console.log("====================================");
        // console.log(this.TrainersArray);
      },
      (err) => {
        console.log("error in get trainers");
        console.log(err);
      }
    );
  }

  deleteTrainer(id: number) {
    this.trainerservice.deleteTrainerById(id).subscribe(
      (res) => {
        // console.log(res);
        this.toastr.success("Trainer deleted successfully!", "Success");
        this.ngOnInit();
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
