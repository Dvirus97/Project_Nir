import { RouterBase } from "./base.route";
import { Course } from "../../../types/models/course.model";
import { Semester } from "../../../types/models/semester.model";
import { FileManager } from "../fileManager";

export class CourseRoute extends RouterBase<Course> {
  protected fileManager = new FileManager<Course>("course.json");
}
export class SemesterRoute extends RouterBase<Semester> {
  protected fileManager = new FileManager<Semester>("semester.json");
}
