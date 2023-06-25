import { Course } from "./course.model";

enum gender{
    'female','male'
}
export interface Trainer{
    id  ?:number,
    fname ?:string,
    lname ?:string,       
    gender ?:string,
    phone ?:string,
    img  ?:string,
    email ?:string,
    password  ?:string,
    facebook  ?:string,
    twitter ?:string,
    linkedin ?:string, 
    courses ?: Course[]
}