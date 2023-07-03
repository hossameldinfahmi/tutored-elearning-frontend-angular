import { Course } from "./course.model";
import { Student } from "./student.model";

export interface Feedback {
  id?: number;
  name?: string;
  rating?: number;
  review?: string;
  student_id?: number;
  course_id?: number;
  student?: Student;
  course?: Course;
}
