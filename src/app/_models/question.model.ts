import { Exam } from "./exam.model";

export interface Question{
    id?:number,
    header ?:string,
    choice_1 ?:string,
    choice_2 ?:string,
    choice_3 ?:string,
    choice_4 ?:string,
    answer?:string,
    score?:number,
    exam_id?:number,

}


