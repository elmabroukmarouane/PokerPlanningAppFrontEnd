import { User } from "./user.model";

export class Role {
    id : Number;
    title: string;
    description: string;
    users: User[];
}
