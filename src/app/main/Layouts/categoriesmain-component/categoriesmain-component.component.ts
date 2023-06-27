import { Component, OnInit } from "@angular/core";
import { Category } from "src/app/_models/category.model";
import { CategororyService } from "src/app/_services/categorory.service";

@Component({
  selector: "app-categoriesmain-component",
  templateUrl: "./categoriesmain-component.component.html",
  styleUrls: ["./categoriesmain-component.component.css"],
})
export class CategoriesmainComponentComponent implements OnInit {
  constructor(private categoryService: CategororyService) {}

  url = "http://localhost:8000/uploads/categores/";

  catarray!: Category[];
  ngOnInit(): void {
    this.getAll();
  }

  p: number = 1;

  getAll() {
    this.categoryService.getcategories().subscribe(
      (res) => {
        this.catarray = res.data;
      },
      (err) => {
        console.log(err);
      },
      () => {}
    );
  }
}
