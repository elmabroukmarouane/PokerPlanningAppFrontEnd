import { Entity } from "./entity.model";
import { Group } from "./group.model"
import { User } from "./user.model"

export class Person extends Entity {
    groupid: Number;
    firstname: string;
    lastname: string;
    group: Group;
    users: User[]
}
