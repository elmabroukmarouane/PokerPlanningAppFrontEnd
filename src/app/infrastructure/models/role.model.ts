import { Entity } from "./entity.model";
import { User } from "./user.model";

export class Role extends Entity {
    title: string;
    description: string;
    users: User[];
}
