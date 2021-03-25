import { Entity } from "./entity.model";
import { Person } from "./person.model";
import { Role } from "./role.model";

export class User extends Entity {
    roleid: Number;
    personid: Number;
    email: string;
    password?: string;
    role: Role;
    person: Person;
}
