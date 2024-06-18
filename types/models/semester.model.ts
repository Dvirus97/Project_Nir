import { Course } from "./course.model";
import { Entity } from "./entityBase.model";
import { guid } from "./helper";

export class Semester extends Entity {
  override Type?: string | undefined = "semester";
  courses: Course[];
  coursesIds: string[];
  semesterNumber: E_semesterNumber;
  semesterAvg: number;
  totalPoints: number;

  constructor(other?: Partial<Semester>) {
    super();
    this.courses = other?.courses ?? [];
    this.coursesIds = other?.coursesIds ?? [];
    this.semesterNumber = other?.semesterNumber ?? 1;
    this.semesterAvg = other?.semesterAvg ?? 0;
    this.totalPoints = other?.totalPoints ?? 0;
  }
}

export enum E_semesterNumber {
  $1 = 1,
  $2 = 2,
  $3 = 3,
  $4 = 4,
  $5 = 5,
  $6 = 6,
  $7 = 7,
  $8 = 8,
}

/**
 * Degree
- ⁠ degree average 

Semester
- ⁠ semester number (1-8)
- ⁠ list of Courses
- ⁠semester average 
- ⁠total number of points 

Course
- number: points
- string: id
- ⁠string: name 
- ⁠number : grade
- ⁠course type
 */
