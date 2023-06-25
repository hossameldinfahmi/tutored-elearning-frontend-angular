import { Course } from "./course.model"

export interface CourseContent{
    id ?:number,
    course_id :number,
    name ?:string,
    content ?:string,
    course?:Course,
}