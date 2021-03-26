import { ICommonFields } from "../interfaces/icommon-fields.interface";
import { IIdentity } from "../interfaces/iidentity.interface";

export class Entity implements IIdentity, ICommonFields {
    id: number;
    createdate: string;
    updatedate: string;
    createdby: string;
    updatedby: string;

    constructor(id: number = 0, createdate: string, updatedate: string, createdby: string, updatedby: string) {
        this.id = id;
        this.createdate = createdate;
        this.updatedate = updatedate;
        this.createdby = createdby;
        this.updatedby = updatedby;
    }
}
