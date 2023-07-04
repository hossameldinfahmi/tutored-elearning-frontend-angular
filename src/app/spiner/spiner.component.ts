import { ChangeDetectorRef, Component } from "@angular/core";
import { SpinerService } from "../_services/spiner.service";

@Component({
  selector: "app-spiner",
  templateUrl: "./spiner.component.html",
  styleUrls: ["./spiner.component.css"],
})
export class SpinerComponent {
  showSpinner = false;
  constructor(
    private spinnerService: SpinerService,
    private cdRef: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.init();
  }
  init() {
    this.spinnerService.getSpinnerObserver().subscribe((status) => {
      this.showSpinner = status === "start";
      this.cdRef.detectChanges();
    });
  }
}
