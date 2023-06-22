import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RegisterStudentComponent } from "./main/register-student/register-student.component";

import { LoginStudentComponent } from "./main/login-student/login-student.component";
import { NgxPaginationModule } from "ngx-pagination";
import { TrainerRegisterComponent } from "./main/trainer-register/trainer-register.component";
import { FooterComponent } from "./main/footer/footer.component";
import { TrainerLoginComponent } from "./main/trainer-login/trainer-login.component";
import { CommonModule } from "@angular/common";
import { NavbarMainComponent } from "./navbar-main/navbar-main.component";

@NgModule({
  declarations: [
    //main Component & Layout
    AppComponent,
    FooterComponent,

    // login
    LoginStudentComponent,

    //Register
    RegisterStudentComponent,
    TrainerRegisterComponent,
    TrainerLoginComponent,
    NavbarMainComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
