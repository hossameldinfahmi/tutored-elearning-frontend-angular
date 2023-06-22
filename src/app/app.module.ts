import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterStudentComponent } from './main/register-student/register-student.component';
import { LoginStudentComponent } from './main/login-student/login-student.component';


import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
   
       RegisterStudentComponent,
       LoginStudentComponent,

       RegisterStudentComponent,
       LoginStudentComponent,

    RegisterStudentComponent,
    LoginStudentComponent,
   
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
   
    NgxPaginationModule,
 
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
