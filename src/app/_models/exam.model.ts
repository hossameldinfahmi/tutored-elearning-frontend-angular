import { Course } from "./course.model";
import { Question } from "./question.model";

export interface Exam {
  id?: number;
  title?: string;
  course_id?: number;
  course?: Course;
  max_score?: number;
  questions?: Question[];
}
export interface ExamResponse {
  status: boolean;
  message: string;
  exams: Exam[];
  error: any;
}
