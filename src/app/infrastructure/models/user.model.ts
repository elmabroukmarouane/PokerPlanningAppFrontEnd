import { Person } from "./person.model";
import { Role } from "./role.model";

export class User {
    id: Number;
    roleid: Number;
    personid: Number;
    email: string;
    password?: string;
    role: Role;
    person: Person;
}
