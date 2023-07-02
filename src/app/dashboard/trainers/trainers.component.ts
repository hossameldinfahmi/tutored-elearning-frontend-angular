import { Component, OnInit } from '@angular/core';
import { TrainerService } from 'src/app/_services/trainer.service';
import { Trainer } from '../../_models/trainer.model';

@Component({
  selector: 'app-trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.css']
})
export class TrainersComponent implements OnInit {

  constructor(private trainerservice: TrainerService) {}

  TrainersArray:Trainer[]=[]

  url="http://localhost:8000/uploads/trainer/";
  p: number = 1;


  ngOnInit(): void {
    this.getAlltrainers();
  }

  getAlltrainers() {
    this.trainerservice.getAllTrainers().subscribe(
      (res) => {
        this.TrainersArray = res.data;
        // console.log(this.TrainersArray);
      },
      (err) => {
        console.log('error in get trainers');
        console.log(err);
      }
    );}

 deleteTrainer(id:number){
      this.trainerservice.deleteTrainerById(id).subscribe(
        (res) => {
          // console.log(res);
          this.ngOnInit();
        },
        (err) => {
          console.log('Error deleting trainer');
          console.log(err);
        }
      );
    }










}
