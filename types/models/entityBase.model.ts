import { guid } from "./helper";

export class Entity {
  id?: string = guid.new();
  Type?: string;
}
