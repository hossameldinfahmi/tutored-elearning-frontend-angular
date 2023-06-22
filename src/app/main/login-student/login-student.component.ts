import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-student',
  templateUrl: './login-student.component.html',
  styleUrls: ['./login-student.component.css']
})
export class LoginStudentComponent implements OnInit {

  constructor( 
    ) {}

  ngOnInit(): void {
  }

  data={email:"",password:""}

  login(form: NgForm){
    if(form.invalid){
      return;
    }

    this.data.email=form.value.email
    this.data.password=form.value.password
  }
}
