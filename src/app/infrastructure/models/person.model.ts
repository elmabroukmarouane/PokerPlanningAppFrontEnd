import { Group } from "./group.model"
import { User } from "./user.model"

export class Person {
    id: Number;
    groupid: Number;
    firstname: string;
    lastname: string;
    group: Group;
    users: User[]
}
