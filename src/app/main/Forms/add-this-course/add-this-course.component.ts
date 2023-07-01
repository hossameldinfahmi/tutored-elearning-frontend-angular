import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Category } from 'src/app/_models/category.model';
import { Course } from 'src/app/_models/course.model';
import { Trainer } from 'src/app/_models/trainer.model';
import { CategororyService } from 'src/app/_services/categorory.service';
import { CoursesService } from 'src/app/_services/courses.service';
import { TrainerService } from 'src/app/_services/trainer.service';

@Component({
  selector: 'app-add-this-course',
  templateUrl: './add-this-course.component.html',
  styleUrls: ['./add-this-course.component.css']
})
export class AddThisCourseComponent implements OnInit {

  constructor(
    private courseService: CoursesService,
    private categoryService: CategororyService,
    private trainerService: TrainerService,
    private formbuilder: FormBuilder
  ) {}

  categories!: Category[];
  trainers!: Trainer[];
  newCourse: Course = {
    id: 1,
    name: '',
    trainer_id: 0,
    category_id: 0,
    img: '',
    price: 0,
    duration: 0,
    preq: '',
    desc: '',
  };

  trainerId:string=localStorage.getItem('id')!;

  getAllCategories() {
    this.categoryService.getcategories().subscribe(
      (res) => {
        this.categories = res.data;
        // console.log(this.categories);
      },
      (err) => {
        console.log('Error getting all categories');
        console.log(err);
      }
    );
  }



  ngOnInit(): void {
    this.getAllCategories();
    // this.getAllTrainers();
    this.creatForm();
  }

  ff = new FormData();
  data: Course = {
    name: 'yomna',
    img: this.ff,

    category_id: 8,
    trainer_id: 8,
    preq: 'klnkl',
    price: 0,
    desc: 'knlnlnl',
  };

  resetForm(form: NgForm) {
    form.reset();
  }

  files: any;
  submitted = false;
  form!: FormGroup;

  creatForm() {
    this.form = this.formbuilder.group({
      name: [null, Validators.required],
      category_id: [null, Validators.required],
      price: [null, Validators.required],
      duration: [null, Validators.required],
      preq: [null, Validators.required],
      desc: [null, Validators.required],
      trainer_id: [this.trainerId],
      image: [null, Validators.required],
    });
  }


  get f() {
    return this.form.controls;
  }

  uploadImage(event: any) {
    this.files = event.target.files[0];
    // console.log(this.files);
  }
  onsubmit(form: any) {
    this.submitted = true;
    if (this.form.invalid) {
      console.log('form invalid');
    }
   

    const formdata = new FormData();
    formdata.append('img', this.files, this.files.name);

    formdata.append('name', form.value.name);
    formdata.append('category_id', form.value.category_id);
    formdata.append('price', form.value.price);
    formdata.append('duration', form.value.duration);
    formdata.append('trainer_id', this.trainerId);
    formdata.append('desc', form.value.desc);
    formdata.append('preq', form.value.preq);

    this.data.name = form.value.name;
    this.data.img = form.value.image;
    this.data.price = form.value.price;
    this.data.duration = form.value.duration;
    this.data.trainer_id = parseInt(this.trainerId);
    this.data.category_id = form.value.category_id;
    this.data.desc = form.value.desc;
    this.data.preq = form.value.preq;

    // console.log(this.data);
    this.courseService.create(formdata).subscribe(
      (res) => {
        // console.log(res);
      },
      (err) => {
        console.log('Error adding course');
        console.log(err);
      }
    );
  }





}
