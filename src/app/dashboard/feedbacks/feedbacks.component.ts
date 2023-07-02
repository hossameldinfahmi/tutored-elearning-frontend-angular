import { Component, OnInit } from '@angular/core';

import { Feedback } from '../../_models/feedback.model';
import { FeedbackService } from '../../_services/feedback.service';

@Component({
  selector: 'app-feedbacks',
  templateUrl: './feedbacks.component.html',
  styleUrls: ['./feedbacks.component.css']
})
export class FeedbacksComponent implements OnInit {

  constructor( private feedbackService: FeedbackService) { }

  feed!:Feedback[]
  p: number = 1;

  ngOnInit(): void {
    this.getAllfeedbacks();
  }



  getAllfeedbacks() {
    this.feedbackService.getAllfeedbacks().subscribe(
      (res) => {
        this.feed = res;
        // console.log(this.feed);
      },
      (err) => {
        console.log('Error in get all feeds');
        console.log(err);
      }
    );
  }


  deletefeedback(id:number){
      this.feedbackService.deleteFeedbackById(id).subscribe(
        (res) => {
          // console.log(res);
          this.ngOnInit();
        },
        (err) => {
          console.log('Error deleting feedback');
          console.log(err);
        }
      );
    }
}
