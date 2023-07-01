import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Course } from "src/app/_models/course.model";
import { CourseContent } from "src/app/_models/course_content.model";
import { CourseContentService } from "src/app/_services/course-content.service";
import { CoursesService } from "src/app/_services/courses.service";
import { CourseStudent } from "src/app/_models/course_student.model";
import { CourseStudentService } from "src/app/_services/course-student.service";
import { QuestionService } from "src/app/_services/question.service";
@Component({
  selector: "app-courses-details-page",
  templateUrl: "./courses-details-page.component.html",
  styleUrls: ["./courses-details-page.component.css"],
})
export class CoursesDetailsPageComponent implements OnInit {
  checkUser!: string;

  coursedetails: Course = {
    id: 1,
    name: "design development",
    img: "umd.png",
    price: 200,
    duration: 43,
    preq: "ferb jkdnejk dfvjnl",
    desc: "dfvhbkjf fdcnhfv fdncjvn",
    trainer_id: 4,
    category_id: 1,
    category: {
      id: 1,
      name: "web",
      img: "testimg.jpg",
    },
    trainer: {
      id: 4,
      fname: "sara",
      lname: "sara",
      gender: "female",
      phone: "52748349",
      img: "img.png",
      email: "sara@gmain.com",
      password: "53478",
      facebook: "asdgh",
      twitter: "dscnjksd",
      linkedin: "sdcbks",
    },
  };

  coursestud: CourseStudent = {
    student_id: 0,
    course_id: 0,
  };

  active: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CoursesService,
    private coursestudent: CourseStudentService,
    private question: QuestionService
  ) {}

  studid: any;
  trainerId: number = 0;

  examQuestion!: any;
  id: number = 0;
  ngOnInit(): void {
    if (localStorage.getItem("role") == "isTrainer") {
      this.checkUser = "trainer";
      this.trainerId = parseInt(localStorage.getItem("id")!);
    } else this.checkUser = "student";

    this.activatedRoute.params.subscribe((params) => {
      this.id = params["courseId"];
      // console.log(params);
      if (this.id) {
        this.getCoursedetails(this.id);
        this.coursestud.course_id = this.id;
        this.studid = localStorage.getItem("id");
        this.coursestud.student_id = this.studid;
        this.checkenroll();
      }
    });
    this.getAllexamQuestions();
  }

  getAllexamQuestions() {
    this.question.getexamQuestions(this.id).subscribe(
      (res) => {
        this.examQuestion = res.data;
        console.log(this.examQuestion);
        localStorage.setItem("exam_id", this.examQuestion[0].exam_id);
        console.log(this.examQuestion[0].exam_id);
      },
      (err) => {
        console.log("cant load data from exam question");
        console.log(err);
      }
    );
  }

  getCoursedetails(id: number) {
    this.courseService.getCourseById(id).subscribe(
      (res) => {
        this.coursedetails = res;
        // console.log(res);
      },
      (err) => {
        console.log("Error getting course details");
        console.log(err);
      }
    );
  }

  checkenroll() {
    this.coursestudent.course_student_enroll(this.coursestud).subscribe(
      (res) => {
        this.active = true;
        // console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
