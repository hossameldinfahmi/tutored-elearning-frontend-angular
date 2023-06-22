import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainLoginComponent } from "./main/login/login.component";

const routes: Routes = [
  { path: "", redirectTo: "/main/home", pathMatch: "full" },

  {
    path: "main",
    children: [
      // { path: 'register', component: RegisterComponent },
      { path: "login", component: MainLoginComponent },
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
