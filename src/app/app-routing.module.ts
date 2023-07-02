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

const routes: Routes = [
  { path: "", redirectTo: "/main/home", pathMatch: "full" },

  {
    path: "main",
    children: [
      { path: "", redirectTo: "/home", pathMatch: "full" },
      {
        path: "home",
        component: HomePageComponent,
      },
      { path: "about", component: AboutPageComponent },
      { path: "login", component: MainLoginComponent },
      { path: "login/student", component: LoginStudentComponent },
      { path: "register", component: RegisterComponent },
      { path: "register/student", component: RegisterStudentComponent },
      { path: "student/courses", component: MyCoursesComponent },
      { path: "contact", component: ContactPageComponent },
      { path: "categories", component: CategoriesPageComponent },
      { path: "courses", component: CoursesPageComponent },
      { path: "trainers", component: TrainersPageComponent },
      { path: "search", component: SearchComponent },
      { path: "feedback-form/:courseId", component: FeedbackFormComponent },

      {
        path: "courses",
        children: [
          { path: "details/:courseId", component: CoursesDetailsPageComponent },
          { path: "details/:courseId/videos", component: VideoComponent },

          {
            path: "details/:courseId/videos/exam",
            component: ExamPageComponent,
          },
          {
            path: "details/:courseId/videos/exam/result",
            component: ResultComponent,
          },
        ],
      },

      { path: "payment/:courseId", component: PaymentComponent },

      {
        path: "categories",
        children: [
          { path: "details/:categoryId", component: CategoryCoursesComponent },
        ],
      },

      {
        path: "trainer",
        children: [
          { path: "register", component: TrainerRegisterComponent },
          { path: "login", component: TrainerLoginComponent },
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
            path: "course/details/:courseId/exams",
            component: CourseExamDetailsComponent,
          },
          {
            path: "course/details/:courseId/:exam_id/edit-exam",
            component: EditThisExamComponent,
          },
          {
            path: "course/details/:courseId/add-exam",
            component: AddThisExamComponent,
          },
          { path: "exam/:examId", component: QuestionsDetailsComponent },
          {
            path: "exam/:examId/add-question",
            component: AddThisQuestionComponent,
          },
          {
            path: "exam/:examId/update-question/:questionId",
            component: EditThisQuestionComponent,
          },
          { path: "update", component: UpdateTrainerComponent },
          { path: "logout", redirectTo: "main/login", pathMatch: "full" },
        ],
      },
      { path: "student/update", component: UpdateStudentComponent },
      { path: "chat", component: ChatDialogComponent },
    ],
  },

  {
    path: "dashboard",
    children: [
      { path: "", redirectTo: "/home", pathMatch: "full" },

      { path: "login", component: LoginComponent },
      { path: "admins", component: AdminsComponent },
      { path: "home", component: StatisticsComponent },
      { path: "categories", component: CategoriesComponent },
      { path: "courses", component: CoursesComponent },
      { path: "add-admin", component: AddAdminComponent },
      { path: "contactus", component: ContactUsComponent },
      { path: "trainers", component: TrainersComponent },
      { path: "exams", component: ExamsComponent },
      { path: "feedbacks", component: FeedbacksComponent },
      { path: "questions/:id", component: QuestionsComponent },
      { path: "students", component: StudentsComponent },
      { path: "add-category", component: AddCategoryComponent },
      { path: "add-course", component: AddCourseComponent },
      {
        path: "contents/:courseId/:courseName",
        component: CourseContentComponent,
      },
      {
        path: "edit-course-content/:id/:courseId/:courseName",
        component: EditThisCourseContentComponent,
      },
      {
        path: "add-course-content/:courseId/:courseName",
        component: AddCourseContentComponent,
      },
      { path: "add-exam", component: AddExamComponent },
      { path: "add-question/:id", component: AddQuestionComponent },
      {
        path: "update-question/:id/:exam_id",
        component: UpdateQuestionComponent,
      },
      { path: "update-exam/:id", component: UpdateExamComponent },
      { path: "update-course/:id", component: UpdateCourseComponent },
      { path: "update-category/:id", component: UpdateCategoryComponent },
      { path: "payment", component: PaymentComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: "top" })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
