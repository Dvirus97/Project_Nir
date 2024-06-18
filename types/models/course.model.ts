import { Entity } from "./entityBase.model";
import { guid } from "./helper";

export class Course extends Entity {
  override Type?: string | undefined = "course";
  points: number;
  name: string;
  grade: number;
  courseType: E_CourseType;

  constructor(other?: Course) {
    super();
    this.id = other?.id ?? guid.new();
    this.points = other?.points ?? 0;
    this.name = other?.name ?? "";
    this.grade = other?.grade ?? 0;
    this.courseType = other?.courseType ?? 0;
  }
}

export enum E_CourseType {
  Mandatory = 0,
  Free_Choice = 1,
  MALAG = 2,
  Sport = 3,
  BARAK = 4,
  Second_Degree = 5,
}
