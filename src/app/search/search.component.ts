import { Component, OnInit } from "@angular/core";
import { Category } from "../_models/category.model";
import { Course } from "../_models/course.model";
import { CategororyService } from "../_services/categorory.service";
import { CoursesService } from "../_services/courses.service";
import { DataService } from "../_services/data.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent implements OnInit {
  data: any;
  searchText: any;
  courseArray!: Course[];
  catarray!: Category[];
  constructor(
    private dataService: DataService,
    private courseService: CoursesService,
    private categoryService: CategororyService
  ) {}

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllCourses();
  }

  getAllCategories() {
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

  getAllCourses() {
    this.courseService.getAllCourses().subscribe(
      (res) => {
        this.courseArray = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      },
      () => {}
    );
  }
}
