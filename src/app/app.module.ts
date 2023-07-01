import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RegisterStudentComponent } from "./main/register-student/register-student.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";

import { LoginStudentComponent } from "./main/login-student/login-student.component";
import { NgxPaginationModule } from "ngx-pagination";
import { TrainerRegisterComponent } from "./main/trainer-register/trainer-register.component";
import { FooterComponent } from "./main/footer/footer.component";
import { TrainerLoginComponent } from "./main/trainer-login/trainer-login.component";
import { CommonModule } from "@angular/common";
import { NavbarMainComponent } from "./navbar-main/navbar-main.component";
import { CountsComponent } from "./main/Layouts/counts/counts.component";
import { WhyUsComponent } from "./main/Layouts/why-us/why-us.component";
import { AboutComponent } from "./main//Layouts/about/about.component";
import { HomePageComponent } from "./main/home-page/home-page.component";

import { FeaturesComponent } from "./main/Layouts/features/features.component";
import { PopularCourcesComponent } from "./main/Layouts/popular-cources/popular-cources.component";
import { TrainersmainComponentComponent } from "./main/Layouts/trainersmain-component/trainersmain-component.component";
import { ContactComponent } from "./main/Layouts/contact/contact.component";
import { FeedbackComponent } from "./main/Layouts/feedback/feedback.component";
import { AboutPageComponent } from "./main/about-page/about-page.component";
import { HeroComponent } from "./main/Layouts/hero/hero.component";
import { CategoriesmainComponentComponent } from "./main/Layouts/categoriesmain-component/categoriesmain-component.component";
import { CategoriesPageComponent } from "./main/categories-page/categories-page.component";
import { ContactPageComponent } from "./main/contact-page/contact-page.component";
import { CourcesComponent } from "./main/Layouts/cources/cources.component";
import { CoursesPageComponent } from "./main/courses-page/courses-page.component";
import { TrainersPageComponent } from "./main/trainers-page/trainers-page.component";
import { CoursesDetailsPageComponent } from "./main/courses-details-page/courses-details-page.component";
import { CategoryCoursesComponent } from "./main/category-courses/category-courses.component";
import { CourseContentDetailsComponent } from "./main/course-content-details/course-content-details.component";
import { MyCoursesComponent } from "./main/my-courses/my-courses.component";
import { SearchComponent } from "./main/search/search.component";

@NgModule({
  declarations: [
    //main Component
    AppComponent,

    // Layout
    NavbarMainComponent,
    FooterComponent,
    MyCoursesComponent,
    SearchComponent,

    //home Page
    HomePageComponent,
    HeroComponent,
    AboutComponent,
    CountsComponent,
    WhyUsComponent,
    FeaturesComponent,
    PopularCourcesComponent,
    TrainersmainComponentComponent,
    CourseContentDetailsComponent,

    // login
    LoginStudentComponent,
    TrainerLoginComponent,

    //Register
    RegisterStudentComponent,
    TrainerRegisterComponent,

    //contact
    ContactPageComponent,
    ContactComponent,

    //Categories
    CategoriesPageComponent,
    CategoriesmainComponentComponent,
    CategoryCoursesComponent,

    // About
    AboutPageComponent,
    FeedbackComponent,

    // Courses
    CoursesPageComponent,
    CourcesComponent,
    CoursesDetailsPageComponent,

    // Trainers Page
    TrainersPageComponent,
    TrainersmainComponentComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
