import { Course } from "./course.model";

export interface Category{

    id?:number,
    name:string,
    img?:any,
    courses?:Course[],


}

export interface Categoryobj{
    data:Category[],
    status: boolean,
    error: any[]
}
