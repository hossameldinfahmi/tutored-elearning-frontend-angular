import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  // constructor( private adminService: StudentService) { }
  ngOnInit(): void {}
  //  studentArray!: Student[];

  //   newStudent: Student = {

  //     fname:'',
  //     lname:'',
  //     gender:'',//enum
  //     phone:'',
  //     email:'',
  //     pass:''

  // };

  //   addStudent(form: NgForm) {
  //     this.newStudent.fname = form.value['fname'];
  //     this.newStudent.lname = form.value['lname'];
  //     this.newStudent.gender= form.value['gender'];
  //     this.newStudent.phone = form.value['phone'];
  //     this.newStudent.email = form.value['email'];
  //     this.newStudent.pass= form.value['pass'];

  //     // console.log(this.newContent);

  //     this.studentService.addStudent(this.newStudent).subscribe(
  //       (res) => {
  //         // this.coursesContentsArr = res;
  //         console.log(res.data);

  //       },
  //       (err) => {
  //         console.log('Error adding course content');

  //       }
  //     );
  //   }

  //   onSubmit(form: NgForm) {
  //     console.log(form);
  //     console.log(form.value);
  //   }

  resetForm(form: NgForm) {
    form.reset();
  }
}
