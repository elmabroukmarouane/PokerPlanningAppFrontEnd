import { Entity } from "./entity.model";
import { Person } from "./person.model";

export class Group extends Entity {
    groupname: string;
    persons: Person[]
}
