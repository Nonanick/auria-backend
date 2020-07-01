import { DefaultSchemaData } from "../../../../database/schemaInterface/default/DefaultSchemaData.js";
import { IRowProcedure, IRowProcedureParams } from "../row/IRowProcedure.js";

export class UpdateProcedureClass implements IRowProcedure {

    protected _name: string = "UPDATE";

    public get name(): string {
        return this._name;
    }

    public run<T extends DefaultSchemaData = DefaultSchemaData>({ user, entity, row, authority, useTransaction }: IRowProcedureParams<T>) {

    }

}

export const UpdateProcedure = new UpdateProcedureClass();