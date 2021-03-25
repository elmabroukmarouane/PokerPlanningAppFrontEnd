import { ICommonFields } from "../interfaces/icommon-fields.interface";
import { IIdentity } from "../interfaces/iidentity.interface";

export class Entity implements IIdentity, ICommonFields {
    id: number;
    createdate: string;
    updatedate: string;
    createdby: string;
    updatedby: string;
}
