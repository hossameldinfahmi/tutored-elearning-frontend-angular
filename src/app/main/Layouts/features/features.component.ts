import { Component, OnInit } from "@angular/core";
import { CategororyService } from "src/app/_services/categorory.service";
import { Category } from "src/app/_models/category.model";

@Component({
  selector: "app-features",
  templateUrl: "./features.component.html",
  styleUrls: ["./features.component.css"],
})
export class FeaturesComponent implements OnInit {
  catarray!: Category[];
  constructor(private categoryService: CategororyService) {}

  ngOnInit(): void {
    this.getAll();
  }
  url = "http://localhost:8000/uploads/categores/";

  getAll() {
    this.categoryService.getcategories().subscribe(
      (res) => {
        this.catarray = res.data;
        // console.log(res);
      },
      (err) => {
        console.log(err);
      },
      () => {}
    );
  }
}
