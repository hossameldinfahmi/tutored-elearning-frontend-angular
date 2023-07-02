import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private adminservice:AdminService,private router: Router,) { }

  name:string = localStorage.getItem('name')!;
  ngOnInit(): void {
  }

  logout(){
    this.adminservice.Adminlogout().subscribe(
      (res)=>{
        // console.log(res);
        localStorage.removeItem('id');
        localStorage.removeItem('Authorization');
        localStorage.removeItem('role');
        localStorage.removeItem('name');
        // localStorage.removeItem('pusherTransportTLS');
        localStorage.removeItem('exam_id');


        this.router.navigate(['/dashboard/login']);

      },
      (error)=>{
        console.log(error);

      }
    )

  }


}
