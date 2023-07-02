import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/_models/course.model';
import { CoursesService } from 'src/app/_services/courses.service';
import { Category, Categoryobj } from '../../_models/category.model';
import { CategororyService } from '../../_services/categorory.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private categoryService:CategororyService) { }

  catarray!:Category[];
  ngOnInit(): void {
  this.getAll();
  }
  p: number = 1;
  
  url="https://short-online-courses.herokuapp.com/uploads/categores/"

  getAll(){
    this.categoryService.getcategories().subscribe(
      (res)=>{
        this.catarray=res.data;
        // console.log(res);

      },
      (err)=>{
        console.log(err);
      },
      ()=>{}
    );
  }
    
    deletecategory(id:number){
      this.categoryService.deleteCategoryById(id).subscribe(
        (res) => {
          // console.log(res);
          this.ngOnInit();
        },
        (err) => {
          console.log('Error deleting category');
          console.log(err);
          
        }
      );
    }


  
   
  
}
