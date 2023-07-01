import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/_models/category.model';
import { Course } from 'src/app/_models/course.model';
import { Trainer } from 'src/app/_models/trainer.model';
import { CategororyService } from 'src/app/_services/categorory.service';
import { CoursesService } from 'src/app/_services/courses.service';
import { TrainerService } from 'src/app/_services/trainer.service';

@Component({
  selector: 'app-edit-this-course',
  templateUrl: './edit-this-course.component.html',
  styleUrls: ['./edit-this-course.component.css']
})
export class EditThisCourseComponent implements OnInit {

  constructor(
    private courseService: CoursesService,
    private categoryService: CategororyService,
    private activatedRoute: ActivatedRoute,
    private formbuilder:FormBuilder,
    private trainerService:TrainerService
    ,private router: Router
  ) {}
    id:number=0;
    trainerId:number=parseInt(localStorage.getItem('id')!);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
       this.id = params['courseId'];
      if (this.id) {
        this.getCourse(this.id);
      }
    });
    // this.getAllCategories();
    // this.getAllTrainers();
    this.creatForm();
  }

  categories!: Category[];
  trainers!: Trainer[];
  course: Course = {
    id:1,
    name: '',
    trainer_id: 0,
    category_id: 0,
    price: 0,
    duration: 0,
    preq: '',
    desc: '',
  };

  updatedCourse: Course = {
    name: '',
    trainer_id: 0,
    category_id: 0,
    price: 0,
    duration: 0,
    preq: '',
    desc: '',
  };

  ff=new FormData();
  files: any;
  submitted = false;
  form!: FormGroup;
  

  get f() {
    return this.form.controls;
  }

  uploadImage(event: any) {
    this.files = event.target.files[0];
    // console.log(this.files);
  }


  creatForm() {
    this.form = this.formbuilder.group({
      name: [this.course.name, Validators.required],
      categoryid: [this.course.category?.name, Validators.required],
      price: [null, Validators.required],
      duration: [null, Validators.required],
      preq: [null, Validators.required],
      desc: [null, Validators.required],
      trainerid: [this.trainerId, Validators.required],
      image: [null, Validators.required],
    });
  }



  getCourse(id: number) {
    this.courseService.getCourseById(id).subscribe(
      (res) => {
        this.course = res;
        // console.log(this.course);

        this.form = this.formbuilder.group({
          name: [this.course.name, Validators.required],
          price: [this.course.price, Validators.required],
          categoryid: [this.course.category?.name, Validators.required],
          duration: [this.course.duration, Validators.required],
          preq: [this.course.preq, Validators.required],
          desc: [this.course.desc, Validators.required],
          trainerid: [this.course.trainer?.fname, Validators.required],
          image: [null, Validators.required],
        });
        

      },
      (err) => {
        console.log('Error updating course ', err);
        console.log(err);
      }
    );
  }



  updateCourse(id:number,form: any) {
    this.submitted = true;
    if (this.form.invalid) {
      console.log('form invalid');
    }
    const formdata = new FormData();
    formdata.append('img', this.files, this.files.name);
    formdata.append('name', form.value.name);
    formdata.append('category_id', this.course.category?.id+"");
    formdata.append('price', form.value.price);
    formdata.append('duration', form.value.duration);
    formdata.append('trainer_id', this.trainerId+"");
    formdata.append('desc', form.value.desc);
    formdata.append('preq', form.value.preq);

    this.courseService.updatecourse(id,formdata).subscribe(
      (res) => {
        // console.log(res);
        this.router.navigate(['/main/trainer/courses']);

      },
      (err) => {
        console.log('Error updating course');
      }
    );
  }
 


}
