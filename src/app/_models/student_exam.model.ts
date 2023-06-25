import { Exam } from "./exam.model"
import { Student } from "./student.model"

export interface StudentExam{
    exam_id ?:number,
    exam?:Exam,
    student_id ?:number,
    student?:Student,
    score?:number,
}