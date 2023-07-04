import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainLoginComponent } from "./main/login/login.component";
import { RegisterStudentComponent } from "./main/register-student/register-student.component";
import { RegisterComponent } from "./main/register/register.component";
import { LoginStudentComponent } from "./main/login-student/login-student.component";
import { TrainerRegisterComponent } from "./main/trainer-register/trainer-register.component";
import { TrainerLoginComponent } from "./main/trainer-login/trainer-login.component";
import { HomePageComponent } from "./main/home-page/home-page.component";
import { ContactPageComponent } from "./main/contact-page/contact-page.component";
import { AboutPageComponent } from "./main/about-page/about-page.component";
import { CategoriesPageComponent } from "./main/categories-page/categories-page.component";
import { AuthTrainerGuard } from "./trainer.guard";
import { CoursesPageComponent } from "./main/courses-page/courses-page.component";
import { TrainersPageComponent } from "./main/trainers-page/trainers-page.component";
import { CoursesDetailsPageComponent } from "./main/courses-details-page/courses-details-page.component";
import { CategoryCoursesComponent } from "./main/category-courses/category-courses.component";
import { CourseContentDetailsComponent } from "./main/course-content-details/course-content-details.component";
import { MyCoursesComponent } from "./main/my-courses/my-courses.component";
import { ExamPageComponent } from "./main/exam-page/exam-page.component";
import { UpdateTrainerComponent } from "./main/Forms/update-trainer/update-trainer.component";
import { UpdateStudentComponent } from "./main/Forms/update-student/update-student.component";
import { AddThisCourseContentComponent } from "./main/Forms/add-this-course-content/add-this-course-content.component";
import { EditThisCourseContentComponent } from "./main/Forms/edit-this-course-content/edit-this-course-content.component";
import { AddThisCourseComponent } from "./main/Forms/add-this-course/add-this-course.component";
import { EditThisCourseComponent } from "./main/Forms/edit-this-course/edit-this-course.component";
import { AdminsComponent } from "./dashboard/admins/admins.component";
import { LoginComponent } from "./dashboard/login/login.component";
import { CategoriesComponent } from "./dashboard/categories/categories.component";
import { CoursesComponent } from "./dashboard/courses/courses.component";
import { StatisticsComponent } from "./dashboard/statistics/statistics.component";
import { CourseExamDetailsComponent } from "./main/course-exam-details/course-exam-details.component";
import { QuestionsDetailsComponent } from "./main/questions-details/questions-details.component";
import { SearchComponent } from "./search/search.component";
import { ContactUsComponent } from "./dashboard/contact-us/contact-us.component";
import { ExamsComponent } from "./dashboard/exams/exams.component";
import { FeedbacksComponent } from "./dashboard/feedbacks/feedbacks.component";
import { QuestionsComponent } from "./dashboard/questions/questions/questions.component";
import { StudentsComponent } from "./dashboard/students/students.component";
import { TrainersComponent } from "./dashboard/trainers/trainers.component";
import { AddAdminComponent } from "./dashboard/Forms/add-admin/add-admin.component";
import { AddCategoryComponent } from "./dashboard/Forms/add-category/add-category.component";
import { AddCourseComponent } from "./dashboard/Forms/add-course/add-course.component";
import { AddCourseContentComponent } from "./dashboard/Forms/add-course-content/add-course-content.component";
import { AddExamComponent } from "./dashboard/Forms/add-exam/add-exam.component";
import { AddQuestionComponent } from "./dashboard/Forms/add-question/add-question.component";
import { UpdateQuestionComponent } from "./dashboard/Forms/update-question/update-question.component";
import { UpdateExamComponent } from "./dashboard/Forms/update-exam/update-exam.component";
import { UpdateCourseComponent } from "./dashboard/Forms/update-course/update-course.component";
import { UpdateCategoryComponent } from "./dashboard/Forms/update-category/update-category.component";
import { PaymentComponent } from "./main/payment/payment.component";
import { FeedbackFormComponent } from "./main/Layouts/feedback-form/feedback-form.component";
import { VideoComponent } from "./main/Layouts/video/video.component";
import { ResultComponent } from "./main/result/result.component";
import { AddThisExamComponent } from "./main/Forms/add-this-exam/add-this-exam.component";
import { EditThisExamComponent } from "./main/Forms/edit-this-exam/edit-this-exam.component";
import { AddThisQuestionComponent } from "./main/Forms/add-this-question/add-this-question.component";
import { EditThisQuestionComponent } from "./main/Forms/edit-this-question/edit-this-question.component";
import { ChatDialogComponent } from "./chat/chat-dialog/chat-dialog.component";
import { CourseContentComponent } from "./dashboard/course-content/course-content.component";
import { EditCourseContentComponent } from "./Forms/edit-course-content/edit-course-content.component";
import { StudentGuard } from "./student.guard";
import { IsLoggedGuard } from "./is-logged.guard";
import { AdminGardGuard } from "./admin-gard.guard";
import { AddThisLiveCourseComponent } from "./main/Forms/add-this-live-course/add-this-course-content.component";
import { CertfiedComponent } from "./certfied/certfied.component";

const routes: Routes = [
  { path: "", redirectTo: "/main/home", pathMatch: "full" },

  {
    path: "main",
    children: [
      { path: "", redirectTo: "/main/home", pathMatch: "full" },
      {
        path: "home",
        component: HomePageComponent,
      },
      { path: "about", component: AboutPageComponent },
      {
        path: "login",
        canActivate: [IsLoggedGuard],
        component: MainLoginComponent,
      },
      {
        path: "login/student",
        canActivate: [IsLoggedGuard],
        component: LoginStudentComponent,
      },
      {
        path: "register",
        canActivate: [IsLoggedGuard],
        component: RegisterComponent,
      },
      {
        path: "register/student",
        canActivate: [IsLoggedGuard],
        component: RegisterStudentComponent,
      },

      { path: "contact", component: ContactPageComponent },
      { path: "categories", component: CategoriesPageComponent },
      { path: "courses", component: CoursesPageComponent },
      { path: "trainers", component: TrainersPageComponent },
      { path: "search", component: SearchComponent },
      { path: "feedback-form/:courseId", component: FeedbackFormComponent },
      { path: "payment/:courseId", component: PaymentComponent },
      {
        path: "categories",
        children: [
          { path: "details/:categoryId", component: CategoryCoursesComponent },
        ],
      },
      { path: "chat", component: ChatDialogComponent },

      {
        path: "courses",
        children: [
          { path: "details/:courseId", component: CoursesDetailsPageComponent },
          {
            path: "details/:courseId/videos",
            canActivate: [StudentGuard],
            component: VideoComponent,
          },

          {
            path: "details/:courseId/videos/exam",
            canActivate: [StudentGuard],

            component: ExamPageComponent,
          },
          {
            path: "details/:courseId/videos/exam/result",
            canActivate: [StudentGuard],

            component: ResultComponent,
          },
        ],
      },
      {
        path: "student/certified/:studentId/:courseId/:verificationNumber",
        canActivate: [StudentGuard],
        component: CertfiedComponent,
      },

      {
        path: "student/courses",
        canActivate: [StudentGuard],
        component: MyCoursesComponent,
      },
      {
        path: "student/update",
        canActivate: [StudentGuard],
        component: UpdateStudentComponent,
      },

      {
        path: "trainer",
        children: [
          {
            path: "register",
            canActivate: [IsLoggedGuard],
            component: TrainerRegisterComponent,
          },
          {
            path: "login",
            canActivate: [IsLoggedGuard],
            component: TrainerLoginComponent,
          },
          {
            path: "courses",
            canActivate: [AuthTrainerGuard],
            component: MyCoursesComponent,
          },
          {
            path: "add-course",
            canActivate: [AuthTrainerGuard],
            component: AddThisCourseComponent,
          },
          {
            path: "edit-course/:courseId",
            canActivate: [AuthTrainerGuard],
            component: EditThisCourseComponent,
          },
          {
            path: "course/details/:courseId",
            canActivate: [AuthTrainerGuard],
            component: CourseContentDetailsComponent,
          },
          {
            path: "course/details/:courseId/add-content",
            canActivate: [AuthTrainerGuard],
            component: AddThisCourseContentComponent,
          },
          {
            path: "course/details/:courseId/:contentId/edit-content",
            canActivate: [AuthTrainerGuard],
            component: EditThisCourseContentComponent,
          },
          {
            path: "edit-course-content/:id/:courseId/:courseName",
            canActivate: [AuthTrainerGuard],
            component: EditCourseContentComponent,
          },
          {
            path: "course/details/:courseId/exams",
            canActivate: [AuthTrainerGuard],
            component: CourseExamDetailsComponent,
          },
          {
            path: "course/details/:courseId/:exam_id/edit-exam",
            canActivate: [AuthTrainerGuard],
            component: EditThisExamComponent,
          },
          {
            path: "course/details/:courseId/add-exam",
            canActivate: [AuthTrainerGuard],
            component: AddThisExamComponent,
          },
          {
            path: "exam/:examId",
            canActivate: [AuthTrainerGuard],
            component: QuestionsDetailsComponent,
          },
          {
            path: "exam/:examId/add-question",
            canActivate: [AuthTrainerGuard],
            component: AddThisQuestionComponent,
          },
          {
            path: "exam/:examId/update-question/:questionId",
            canActivate: [AuthTrainerGuard],
            component: EditThisQuestionComponent,
          },
          {
            path: "update",
            canActivate: [AuthTrainerGuard],
            component: UpdateTrainerComponent,
          },
          { path: "logout", redirectTo: "main/login", pathMatch: "full" },
          // live
          {
            path: "course/details/:courseId/add-live",
            canActivate: [AuthTrainerGuard],
            component: AddThisLiveCourseComponent,
          },
        ],
      },
    ],
  },

  {
    path: "dashboard",
    children: [
      { path: "", redirectTo: "/main/home", pathMatch: "full" },

      {
        path: "login",
        canActivate: [IsLoggedGuard],
        component: LoginComponent,
      },
      {
        path: "admins",
        canActivate: [AdminGardGuard],
        component: AdminsComponent,
      },
      {
        path: "home",
        canActivate: [AdminGardGuard],
        component: StatisticsComponent,
      },
      {
        path: "categories",
        canActivate: [AdminGardGuard],
        component: CategoriesComponent,
      },
      {
        path: "courses",
        canActivate: [AdminGardGuard],
        component: CoursesComponent,
      },
      {
        path: "add-admin",
        canActivate: [AdminGardGuard],
        component: AddAdminComponent,
      },
      {
        path: "contactus",
        canActivate: [AdminGardGuard],
        component: ContactUsComponent,
      },
      {
        path: "trainers",
        canActivate: [AdminGardGuard],
        component: TrainersComponent,
      },
      {
        path: "exams",
        canActivate: [AdminGardGuard],
        component: ExamsComponent,
      },
      {
        path: "feedbacks",
        canActivate: [AdminGardGuard],
        component: FeedbacksComponent,
      },
      {
        path: "questions/:id",
        canActivate: [AdminGardGuard],
        component: QuestionsComponent,
      },
      {
        path: "students",
        canActivate: [AdminGardGuard],
        component: StudentsComponent,
      },
      {
        path: "add-category",
        canActivate: [AdminGardGuard],
        component: AddCategoryComponent,
      },
      {
        path: "add-course",
        canActivate: [AdminGardGuard],
        component: AddCourseComponent,
      },
      {
        path: "contents/:courseId/:courseName",
        canActivate: [AdminGardGuard],

        component: CourseContentComponent,
      },
      {
        path: "edit-course-content/:id/:courseId/:courseName",
        canActivate: [AdminGardGuard],

        component: EditCourseContentComponent,
      },
      {
        path: "add-course-content/:courseId/:courseName",
        canActivate: [AdminGardGuard],

        component: AddCourseContentComponent,
      },
      {
        path: "add-exam",
        canActivate: [AdminGardGuard],
        component: AddExamComponent,
      },
      {
        path: "add-question/:id",
        canActivate: [AdminGardGuard],
        component: AddQuestionComponent,
      },
      {
        path: "update-question/:id/:exam_id",
        canActivate: [AdminGardGuard],

        component: UpdateQuestionComponent,
      },
      {
        path: "update-exam/:id",
        canActivate: [AdminGardGuard],
        component: UpdateExamComponent,
      },
      {
        path: "update-course/:id",
        canActivate: [AdminGardGuard],
        component: UpdateCourseComponent,
      },
      {
        path: "update-category/:id",
        canActivate: [AdminGardGuard],
        component: UpdateCategoryComponent,
      },
      {
        path: "payment",
        canActivate: [AdminGardGuard],
        component: PaymentComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "top" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
