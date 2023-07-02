import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  OnDestroy,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { environment } from "src/environments/environment";
import { AngularStripeService } from "@fireflysemantics/angular-stripe-service";
import { Subscription } from "rxjs";
import { take, map, tap, delay, switchMap, filter } from "rxjs/operators";
import { CoursesService } from "src/app/_services/courses.service";
import { Course } from "src/app/_models/course.model";
import { CourseStudentService } from "src/app/_services/course-student.service";
import { CourseStudent } from "src/app/_models/course_student.model";
import { PaymentService } from "src/app/_services/payment.service";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"],
})
export class PaymentComponent implements OnInit {
  constructor(
    private cd: ChangeDetectorRef,
    private payment: PaymentService,
    private router: Router,
    private stripeService: AngularStripeService,
    private activatedRoute: ActivatedRoute,
    private courseService: CoursesService,
    private courseStudentService: CourseStudentService
  ) {}

  coursestud: CourseStudent = {
    student_id: 0,
    course_id: 0,
  };
  coursedetails!: Course;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params["courseId"];
      // console.log(params);
      if (id) {
        this.getCoursedetails(id);
        // console.log(this.coursedetails);
      }
    });
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

  //  @ViewChild('cardInfo', { static: false }) cardInfo: ElementRef;
  @ViewChild("cardInfo", { static: false }) cardInfo!: ElementRef;

  title = "stripeAngular";

  //Declare dummy data
  id: string = "123";
  name: string = "powerbike";
  email: string = "nelsob44@yahoo.com";
  price: number = 1200;
  currency: string = "gbp";
  description: string = "A very good bike";
  private paymentIntentSub!: Subscription;

  stripe: any;
  loading = false;
  confirmation: any;
  clSecret!: string;

  // card: any;
  // cardHandler = this.onChange.bind(this);
  // error: string;

  card: any;
  cardHandler = this.onChange.bind(this);
  error: any;

  ngAfterViewInit() {
    const stripePubKey = environment.publishableKeyStripe;
    this.stripeService.setPublishableKey(stripePubKey).then((stripe) => {
      this.stripe = stripe;
      const elements = stripe.elements();
      this.card = elements.create("card");
      this.card.mount(this.cardInfo.nativeElement);
      this.card.addEventListener("change", this.cardHandler);
    });
  }
  emaill!: string;
  onChange(error: any) {
    if (error) {
      this.error = error.message;
    } else {
      this.error;
    }
    this.cd.detectChanges();
  }

  async onSubmit(form: NgForm) {
    const { token, error } = await this.stripe.createToken(this.card);

    if (error) {
      console.log("Error:", error);
    } else {
      console.log("Success!", token);
      await this.onClickStripe(form);
    }
  }

  onClickStripe(form: NgForm) {
    this.name = this.coursedetails.name!;
    this.price = this.coursedetails.price!;
    this.description = this.coursedetails.desc!;
    this.emaill = localStorage.getItem("name")!;
    return (this.paymentIntentSub = this.payment
      .addPaymentIntentStripe(
        this.id,
        this.name,
        this.email,
        this.price,
        this.currency,
        this.description
      )
      .pipe(
        switchMap((intent) => {
          this.clSecret = intent.intent.client_secret;
          return this.payment.storePaymentIntent(
            this.id,
            this.name,
            this.email,
            this.price,
            this.currency,
            this.description,
            intent.intent.id
          );
        })
      )
      .subscribe(() => {
        this.stripe
          .confirmCardPayment(this.clSecret, {
            receipt_email: this.email,
            payment_method: {
              card: this.card,
              billing_details: {
                name: this.name,
                email: this.email,
              },
            },
          })
          .then(
            (res: {
              paymentIntent: { status: string };
              error: { message: any };
            }) => {
              // console.log(res);
              if (
                res.paymentIntent &&
                res.paymentIntent.status === "succeeded"
              ) {
                alert("your payment was successful");
                this.enroll(this.coursedetails.id!);
                form.reset();
                this.router.navigate([
                  "/main/courses/details/" + this.coursedetails.id + "/videos",
                ]);
              } else {
                const errorCode = res.error.message;
                alert(errorCode);
              }
            }
          );
      }));
  }

  ngOnDestroy() {
    if (this.paymentIntentSub) {
      this.paymentIntentSub.unsubscribe();
    }
    this.card.removeEventListener("change", this.cardHandler);
    this.card.destroy();
  }

  enroll(course_id: number) {
    this.coursestud.course_id = course_id;
    this.coursestud.student_id = parseInt(localStorage.getItem("id")!);
    // console.log(this.coursestud)
    this.courseStudentService.enroll(this.coursestud).subscribe(
      (res) => {
        // console.log(res);
      },
      (err) => {
        console.log("Error adding course content");
        console.log(err);
      }
    );
  }
}
