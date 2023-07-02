import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/_models/category.model';
import { CategororyService } from 'src/app/_services/categorory.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css'],
})
export class UpdateCategoryComponent implements OnInit {

  constructor(private http: HttpClient,private formbuilder:FormBuilder,private categoryservice:CategororyService,private activatedRoute: ActivatedRoute,private router: Router) { }

  cat:Category={id: 2, name: 'category', img: 'cate -6214efae12666.jpg'};
  ff=new FormData();
  files:any;
  submitted=false;
  form!:FormGroup;


  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.getcategory(id);
      }
    });
    this.creatForm();
  }

  getcategory(id: number) {
    this.categoryservice.getCategorybyId(id).subscribe(
      (res) => {
        this.cat = res.data;
        // console.log(this.cat);

        this.form = this.formbuilder.group({
          updatename: [this.cat.name, Validators.required],
          image: [null],
        });
      },
      (err) => {
        console.log('Error getting category');
      }
    );
  }



  creatForm() {
    this.form = this.formbuilder.group({
      updatename: [this, Validators.required],
      image: [null]
    });
  }

  get f() {
    return this.form.controls;
  }

  uploadImage(event: any) {
    this.files = event.target.files[0];
    // console.log(this.files);
  }

  onsubmit(id: any, form: any) {
    //console.log(form.value);
    const formdata = new FormData();
    formdata.append('img', this.files, this.files.name);
    formdata.append('name', form.value.updatename);
// console.log(formdata);

    this.categoryservice.updatecategory(id, formdata).subscribe(
      (res) => {
        // console.log(res);
        this.router.navigate(['/dashboard/categories']);

      },
      (err) => {
        console.log('Error updating category');
      }
    );
  }

  category: Category = {
    name: '',
  };

  updatedCategory: Category = {
    name: '',
  };

 

  resetForm(form: NgForm) {
    form.reset();
  }

}
