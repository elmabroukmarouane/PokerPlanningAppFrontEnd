import { Entity } from "./entity.model";
import { Person } from "./person.model";

export class Group extends Entity {
    groupname: string;
    persons: Person[];

    constructor(id: number = 0, createdate: string, updatedate: string, createdby: string, updatedby: string, groupname: string) {
        super(id, createdate, updatedate, createdby, updatedby);
        this.groupname = groupname;
    }
}
