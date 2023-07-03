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
import { ExamPageComponent } from "./main/exam-page/exam-page.component";
import { UpdateStudentComponent } from "./main/Forms/update-student/update-student.component";
import { UpdateTrainerComponent } from "./main/Forms/update-trainer/update-trainer.component";
import { AddThisCourseContentComponent } from "./main/Forms/add-this-course-content/add-this-course-content.component";
import { EditThisCourseContentComponent } from "./main/Forms/edit-this-course-content/edit-this-course-content.component";
import { AddThisCourseComponent } from "./main/Forms/add-this-course/add-this-course.component";
import { EditThisCourseComponent } from "./main/Forms/edit-this-course/edit-this-course.component";
import { LoginComponent } from "./dashboard/login/login.component";
import { AdminsComponent } from "./dashboard/admins/admins.component";
import { StfooterComponent } from "./dashboard/stfooter/stfooter.component";
import { NavBarComponent } from "./dashboard/nav-bar/nav-bar.component";
import { SideBarComponent } from "./dashboard/side-bar/side-bar.component";
import { StatisticsComponent } from "./dashboard/statistics/statistics.component";
import { CourseExamDetailsComponent } from "./main/course-exam-details/course-exam-details.component";
import { QuestionsDetailsComponent } from "./main/questions-details/questions-details.component";
import { SearchComponent } from "./search/search.component";
import { Ng2SearchPipeModule } from "ng2-search-filter";
import { CoursesComponent } from "./dashboard/courses/courses.component";
import { CategoriesComponent } from "./dashboard/categories/categories.component";
import { CourseContentComponent } from "./dashboard/course-content/course-content.component";
import { ExamsComponent } from "./dashboard/exams/exams.component";
import { FeedbacksComponent } from "./dashboard/feedbacks/feedbacks.component";
import { QuestionsComponent } from "./dashboard/questions/questions/questions.component";
import { StudentsComponent } from "./dashboard/students/students.component";
import { TrainersComponent } from "./dashboard/trainers/trainers.component";
import { ContactUsComponent } from "./dashboard/contact-us/contact-us.component";
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
import { ChatDialogComponent } from "./chat/chat-dialog/chat-dialog.component";
import { PaymentComponent } from "./main/payment/payment.component";
import { FeedbackFormComponent } from "./main/Layouts/feedback-form/feedback-form.component";
import { VideoComponent } from "./main/Layouts/video/video.component";
import { ResultComponent } from "./main/result/result.component";
import { AddThisExamComponent } from "./main/Forms/add-this-exam/add-this-exam.component";
import { EditThisExamComponent } from "./main/Forms/edit-this-exam/edit-this-exam.component";
import { AddThisQuestionComponent } from "./main/Forms/add-this-question/add-this-question.component";
import { EditThisQuestionComponent } from "./main/Forms/edit-this-question/edit-this-question.component";
import { EditCourseContentComponent } from "./Forms/edit-course-content/edit-course-content.component";
import { BooleanPipe } from "./pipe-transform.pipe";
import { AddThisLiveCourseComponent } from "./main/Forms/add-this-live-course/add-this-course-content.component";

@NgModule({
  declarations: [
    BooleanPipe,
    //main Component
    AppComponent,

    // Layout
    NavbarMainComponent,
    FooterComponent,
    MyCoursesComponent,
    SearchComponent,
    UpdateStudentComponent,
    UpdateTrainerComponent,
    EditThisCourseComponent,
    AddThisCourseComponent,
    EditThisCourseContentComponent,
    AddThisCourseContentComponent,
    SearchComponent,
    FeedbackFormComponent,
    VideoComponent,
    ResultComponent,

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

    // Exam
    ExamPageComponent,
    CourseExamDetailsComponent,
    QuestionsDetailsComponent,
    AddThisExamComponent,
    EditThisExamComponent,

    // questions

    AddThisQuestionComponent,
    EditThisQuestionComponent,
    // Dashboard
    LoginComponent,
    AdminsComponent,
    StfooterComponent,
    NavBarComponent,
    SideBarComponent,
    StatisticsComponent,
    CoursesComponent,
    CategoriesComponent,
    CourseContentComponent,

    TrainersComponent,
    ExamsComponent,
    FeedbacksComponent,
    QuestionsComponent,
    StudentsComponent,
    ContactUsComponent,

    //forms Dashboard
    AddAdminComponent,
    AddCategoryComponent,
    AddCourseComponent,
    AddCourseContentComponent,
    AddExamComponent,
    AddQuestionComponent,
    UpdateQuestionComponent,
    UpdateExamComponent,
    UpdateCourseComponent,
    UpdateCategoryComponent,
    EditCourseContentComponent,

    EditCourseContentComponent,
    // Chat
    ChatDialogComponent,

    //payment
    PaymentComponent,

    //live
    AddThisLiveCourseComponent,
  ],

  imports: [
    Ng2SearchPipeModule,
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
