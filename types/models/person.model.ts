import { guid } from "./helper";

export class Person {
  id?: string = guid.new();
  name?: string;
  age?: number;

  constructor(other?: Person) {
    this.id = other?.id;
    this.name = other?.name;
    this.age = other?.age;
  }
}

/**
 * 
 * {
  "data": [
    { "id": "1", "name": "dvir", "age": 11 },
    { "id": "2", "name": "nir", "age": 12 },
    { "id": "3", "name": "berta", "age": 13 },
    { "id": "4", "name": "ori", "age": 22 }
  ]
}

 */
