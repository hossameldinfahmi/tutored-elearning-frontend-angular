import { Course } from "./course.model"

enum gender{
    'female','male'
}
export interface Student{
    id  ?:number,
    fname?:string,
    lname ?:string,      
    gender ?:string,//enum
    phone ?:string,
    img  ?:string
    email  ?:string,
    password ?:string, 
    courses ?: Course[]
}
