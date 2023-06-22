import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  Click(){
    this.router.navigate(['/main/trainer/register'])
}

ClickStudent(){
  this.router.navigate(['/main/register/student'])

}
}
