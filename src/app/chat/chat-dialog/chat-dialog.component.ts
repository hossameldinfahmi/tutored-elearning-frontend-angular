import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import Pusher from "pusher-js";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: "app-chat-dialog",
  templateUrl: "./chat-dialog.component.html",
  styleUrls: ["./chat-dialog.component.css"],
})
export class ChatDialogComponent implements OnInit {
  username = "username";
  message = "";
  messages: any[] = [];

  reply = "we are online course site";

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const name = localStorage.getItem("name");
    this.username = name!;
    console.log(this.username);

    Pusher.logToConsole = true;

    const pusher = new Pusher("a6b0e6bc99281245df30", {
      cluster: "mt1",
    });

    const channel = pusher.subscribe("chat");
    channel.bind("message", (data: any) => {
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
    const token: string = localStorage.getItem("Authorization")!;

    const options = {
      headers: new HttpHeaders({
        Authorization: token,
      }),
    };

    if (token) {
      this.http
        .post(
          "http://localhost:8000/api/messages",
          {
            username: this.username,
            message: this.message,
          },
          options
        )
        .subscribe(() => (this.message = ""));
    } else {
      this.router.navigate(["/main/login"]);
    }
  }

  openForm() {
    document.getElementById("myForm")!.style.display = "block";
  }

  closeForm() {
    document.getElementById("myForm")!.style.display = "none";
  }
}
