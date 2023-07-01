import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Student } from 'src/app/_models/student.model';
import { StudentService } from 'src/app/_services/student.service';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.component.html',
  styleUrls: ['./update-student.component.css']
})
export class UpdateStudentComponent implements OnInit {

  files: any;
  submitted = false;
  form!: FormGroup;
  // data!: Trainer;
  student: Student={fname:"",lname:"",phone:"",img:""};
  studentId!: number;
  ff = new FormData();

  constructor(private studentService:StudentService, private formbuilder:FormBuilder) { }

  ngOnInit(): void {
this.studentId=parseInt(localStorage.getItem('id')!);
this.getStudent(this.studentId);
this.createForm();
  }

  getStudent(id:number){
    this.studentService.getStudentById(id).subscribe(
      res=>{
        this.student=res.data;
        // console.log(this.student);
        
        this.form = this.formbuilder.group({
          fname: [this.student.fname, Validators.required],
          lname: [this.student.lname, Validators.required],
          phone: [this.student.phone, Validators.required],
          img: [null],
        });
      },
      err=>{
        console.log(err);
        
      }
    )
  }

  createForm() {
    this.form = this.formbuilder.group({
      fname: [this, Validators.required],
      lname: [this, Validators.required],
      phone: [this, Validators.required],
      img: [null],
    });
  }

  get f() {
    return this.form.controls;
  }

  uploadImage(event: any) {
    this.files = event.target.files[0];
    // console.log(this.files);
  }

  resetForm(form: FormGroup) {
    form.reset();
  }

  updateStudent(form: any) {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    // console.log(form.value);
    const formdata = new FormData();
    formdata.append('img', this.files, this.files.name);
    formdata.append('fname', form.value.fname);
    formdata.append('lname', form.value.lname);
    formdata.append('phone', form.value.phone);

    // console.log(formdata);

    this.studentService.updateStudent(this.studentId,formdata).subscribe(
          res=>{
            // console.log(res);
            
          },
          err=>{
            console.log(err);
            
          }
        )
  }

}
