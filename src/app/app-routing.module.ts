import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainLoginComponent } from "./main/login/login.component";
import { RegisterStudentComponent } from "./main/register-student/register-student.component";
import { RegisterComponent } from "./main/register/register.component";
import { LoginStudentComponent } from "./main/login-student/login-student.component";
import { TrainerRegisterComponent } from "./main/trainer-register/trainer-register.component";
import { TrainerLoginComponent } from "./main/trainer-login/trainer-login.component";
import { HomePageComponent } from "./main/home-page/home-page.component";
import { ContentComponent } from "./main/content/content.component";
import { ContactPageComponent } from "./main/contact-page/contact-page.component";

const routes: Routes = [
  { path: "", redirectTo: "/main/home", pathMatch: "full" },

  {
    path: "main",
    children: [
      { path: "home", component: HomePageComponent },
      { path: "login", component: MainLoginComponent },
      { path: "login/student", component: LoginStudentComponent },
      { path: "register", component: RegisterComponent },
      { path: "register/student", component: RegisterStudentComponent },
      { path: "enroll/:courseId", component: ContentComponent },
      { path: "contact", component: ContactPageComponent },

      {
        path: "courses",
        children: [],
      },

      {
        path: "categories",
        children: [],
      },

      {
        path: "trainer",
        children: [
          { path: "logout", redirectTo: "main/login", pathMatch: "full" },
          { path: "register", component: TrainerRegisterComponent },
          { path: "login", component: TrainerLoginComponent },
        ],
      },
    ],
  },

  {
    path: "dashboard",
    children: [],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "top" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
