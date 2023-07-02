import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Pusher from 'pusher-js';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {



  username = 'username';
  message = '';
  messages:any[] = [];
  
  reply='we are online course site'

  constructor(private http: HttpClient) {
  }



  ngOnInit(): void {
    const name=localStorage.getItem('name')
    this.username=name!
    console.log(this.username);
    
    Pusher.logToConsole = true;

    const pusher = new Pusher('f71e4af780b4d8afdf8b', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data:any)=>{ 
      this.messages.push(data);
      // if(data.message=="who are you ?"){
        // this.messages.push({message:this.reply,username:"admin"});
      //}
      // else{
      //   this.messages.push({message:"can't understand",username:"admin"});
      // }
      

        });      


  }

  submit(): void {
    this.http.post('http://localhost:8000/api/messages', {
      username: this.username,
      message: this.message
    }).subscribe(
      () => this.message = '')
  }




   openForm() {
    document.getElementById("myForm")!.style.display = "block";
  }
  
   closeForm() {
    document.getElementById("myForm")!.style.display = "none";
  }







}
