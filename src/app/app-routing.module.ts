import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainLoginComponent } from "./main/login/login.component";
import { RegisterStudentComponent } from "./main/register-student/register-student.component";
import { RegisterComponent } from "./main/register/register.component";
import { LoginStudentComponent } from "./main/login-student/login-student.component";
import { TrainerLoginComponent } from "./main/trainer-login/trainer-login.component";

const routes: Routes = [
  { path: "", redirectTo: "/main/home", pathMatch: "full" },

  {
    path: "main",
    children: [
      { path: "login", component: MainLoginComponent },
      { path: "login/student", component: LoginStudentComponent },
      { path: "register", component: RegisterComponent },
      { path: "register/student", component: RegisterStudentComponent },

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
        children: [{ path: "login", component: TrainerLoginComponent }],
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
