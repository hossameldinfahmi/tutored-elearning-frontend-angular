import { Component, OnInit } from "@angular/core";
import { Course } from "src/app/_models/course.model";
import { CoursesService } from "src/app/_services/courses.service";
import { Category, Categoryobj } from "../../_models/category.model";
import { CategororyService } from "../../_services/categorory.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.css"],
})
export class CategoriesComponent implements OnInit {
  constructor(
    private categoryService: CategororyService,
    private toastr: ToastrService
  ) {}

  catarray!: Category[];
  ngOnInit(): void {
    this.getAll();
  }
  p: number = 1;

  url = "https://short-online-courses.herokuapp.com/uploads/categores/";

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

  deletecategory(id: number) {
    this.categoryService.deleteCategoryById(id).subscribe(
      (res) => {
        // console.log(res);
        this.toastr.success("Category Deleted successfully!", "Success");

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
