import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
//import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: "app-content",
  templateUrl: "./content.component.html",
  styleUrls: ["./content.component.css"],
})
export class ContentComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params["courseId"];
      // console.log(params);
      if (id) {
        this.enroll(id);
        // console.log(this.coursedetails);
      }
    });
  }

  enroll(id: number) {}
}
